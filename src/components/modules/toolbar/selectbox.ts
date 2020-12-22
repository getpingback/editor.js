import Module from '../../__module';
import $ from '../../dom';
import * as _ from '../../utils';
import { BlockToolConstructable } from '../../../../types';
import Flipper from '../../flipper';
import { BlockToolAPI } from '../../block';
import I18n from '../../i18n';
import { I18nInternalNS } from '../../i18n/namespace-internal';

/**
 * @class Selectbox
 * @classdesc Holder for Tools
 *
 * @typedef {Selectbox} Selectbox
 * @property {boolean} opened - opening state
 * @property {object} nodes   - Selectbox nodes
 * @property {object} CSS     - CSS class names
 *
 */
export default class Selectbox extends Module {
  /**
   * CSS styles
   *
   * @returns {object.<string, string>}
   */
  public get CSS(): {[name: string]: string} {
    return {
      selectbox: 'ce-selectbox',
      selectBoxActive: 'ce-inline-tool--active',
      selectboxList: 'ce-selectbox__list',
      selectboxButton: 'ce-selectbox__button',
      selectboxButtonActive: 'ce-selectbox__button--active',
      selectboxOpened: 'ce-selectbox--opened',
      openedToolbarHolderModifier: 'codex-editor--selectbox-opened',

      buttonTooltip: 'ce-selectbox-button-tooltip',
      buttonShortcut: 'ce-selectbox-button-tooltip__shortcut',
    };
  }

  /**
   * Returns True if Selectbox is Empty and nothing to show
   *
   * @returns {boolean}
   */
  public get isEmpty(): boolean {
    return this.displayedToolsCount === 0;
  }

  /**
   * Opening state
   *
   * @type {boolean}
   */
  public opened = false;

  /**
   * HTMLElements used for Selectbox UI
   */
  public nodes: {
    selectbox: HTMLElement;
    selectboxList: HTMLElement;
    buttons: HTMLElement[];
  } = {
    selectbox: null,
    selectboxList: null,
    buttons: [],
  };

  /**
   * How many tools displayed in Selectbox
   *
   * @type {number}
   */
  private displayedToolsCount = 0;

  /**
   * Instance of class that responses for leafing buttons by arrows/tab
   *
   * @type {Flipper|null}
   */
  private flipper: Flipper = null;

  /**
   * Makes the Selectbox
   */
  public make(): void {
    this.nodes.selectbox = $.make('div', this.CSS.selectbox);
    $.append(this.Editor.InlineToolbar.nodes.wrapper, this.nodes.selectbox);

    this.nodes.selectboxList = $.make('ul', this.CSS.selectboxList);
    $.append(this.nodes.selectbox, this.nodes.selectboxList);

    this.addTools();
    this.enableFlipper();
  }

  /**
   * Selectbox Tool's button click handler
   *
   * @param {MouseEvent|KeyboardEvent} event - event that activates selectbox button
   * @param {string} toolName - button to activate
   */
  public toolButtonActivate(event: MouseEvent|KeyboardEvent, toolName: string): void {
    const tool = this.Editor.Tools.toolsClasses[toolName] as BlockToolConstructable;

    this.insertNewBlock(tool, toolName);
  }

  /**
   * Open Selectbox with Tools
   */
  public open(): void {
    if (this.isEmpty) {
      return;
    }

    this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolbarHolderModifier);
    this.nodes.selectbox.classList.add(this.CSS.selectboxOpened);
    this.Editor.InlineToolbar.nodes.plusButton.classList.add(this.CSS.selectBoxActive);

    this.opened = true;
    this.flipper.activate();
  }

  /**
   * Close Selectbox
   */
  public close(): void {
    this.nodes.selectbox.classList.remove(this.CSS.selectboxOpened);
    this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolbarHolderModifier);
    this.Editor.InlineToolbar.nodes.plusButton.classList.remove(this.CSS.selectBoxActive);

    this.opened = false;
    this.flipper.deactivate();
  }

  /**
   * Close Selectbox
   */
  public toggle(): void {
    if (!this.opened) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Check status
   */
  public isOpen(): Boolean {
    return this.opened;
  }

  /**
   * Iterates available tools and appends them to the Selectbox
   */
  private addTools(): void {
    const tools = this.Editor.Tools.available;

    for (const toolName in tools) {
      if (Object.prototype.hasOwnProperty.call(tools, toolName)) {
        this.addTool(toolName, tools[toolName] as BlockToolConstructable);
      }
    }
  }

  /**
   * Append Tool to the Selectbox
   *
   * @param {string} toolName - tool name
   * @param {BlockToolConstructable} tool - tool class
   */
  private addTool(toolName: string, tool: BlockToolConstructable): void {
    const internalSettings = this.Editor.Tools.INTERNAL_SETTINGS;
    const userSettings = this.Editor.Tools.USER_SETTINGS;

    const toolSelectboxSettings = tool[internalSettings.TOOLBOX];

    /**
     * Skip tools that don't pass 'selectbox' property
     */
    if (_.isEmpty(toolSelectboxSettings)) {
      return;
    }

    if (toolSelectboxSettings && !toolSelectboxSettings.icon) {
      _.log('Toolbar icon is missed. Tool %o skipped', 'warn', toolName);

      return;
    }

    /**
     * @todo Add checkup for the render method
     */
    // if (typeof tool.render !== 'function') {
    //   _.log('render method missed. Tool %o skipped', 'warn', tool);
    //   return;
    // }

    const userSelectboxSettings = this.Editor.Tools.getToolSettings(toolName)[userSettings.TOOLBOX];

    /**
     * Hide Selectbox button if Selectbox settings is false
     */
    if ((userSelectboxSettings ?? toolSelectboxSettings) === false) {
      return;
    }

    const button = $.make('li', [ this.CSS.selectboxButton ]);
    const svg = $.make('div', null);
    svg.innerHTML = (userSelectboxSettings && userSelectboxSettings.icon) || toolSelectboxSettings.icon;
    
    
    const title = $.make('span', null);
    title.innerHTML = I18n.t(I18nInternalNS.toolNames, (userSelectboxSettings && userSelectboxSettings.title) || toolSelectboxSettings.title || toolName);

    button.dataset.tool = toolName;
    button.appendChild(svg);
    button.appendChild(title);

    $.append(this.nodes.selectboxList, button);

    this.nodes.selectboxList.appendChild(button);
    this.nodes.buttons.push(button);

    /**
     * Add click listener
     */
    this.Editor.Listeners.on(button, 'click', (event: KeyboardEvent|MouseEvent) => {
      this.toolButtonActivate(event, toolName);
      this.close();
    });

    /**
     * Add listeners to show/hide selectbox tooltip
     */
    const tooltipContent = this.drawTooltip(toolName);

    this.Editor.Tooltip.onHover(button, tooltipContent, {
      placement: 'bottom',
      hidingDelay: 200,
    });

    /**
     * Enable shortcut
     */
    const toolSettings = this.Editor.Tools.getToolSettings(toolName);

    if (toolSettings && toolSettings[this.Editor.Tools.USER_SETTINGS.SHORTCUT]) {
      this.enableShortcut(tool, toolName, toolSettings[this.Editor.Tools.USER_SETTINGS.SHORTCUT]);
    }

    /** Increment Tools count */
    this.displayedToolsCount++;
  }

  /**
   * Draw tooltip for selectbox tools
   *
   * @param {string} toolName - selectbox tool name
   * @returns {HTMLElement}
   */
  private drawTooltip(toolName: string): HTMLElement {
    const toolSettings = this.Editor.Tools.getToolSettings(toolName);
    const selectboxSettings = this.Editor.Tools.available[toolName][this.Editor.Tools.INTERNAL_SETTINGS.TOOLBOX] || {};
    const userSelectboxSettings = toolSettings.selectbox || {};
    const name = I18n.t(I18nInternalNS.toolNames, userSelectboxSettings.title || selectboxSettings.title || toolName);

    let shortcut = toolSettings[this.Editor.Tools.USER_SETTINGS.SHORTCUT];

    const tooltip = $.make('div', this.CSS.buttonTooltip);
    const hint = document.createTextNode(_.capitalize(name));

    tooltip.appendChild(hint);

    if (shortcut) {
      shortcut = _.beautifyShortcut(shortcut);

      tooltip.appendChild($.make('div', this.CSS.buttonShortcut, {
        textContent: shortcut,
      }));
    }

    return tooltip;
  }

  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {BlockToolConstructable} tool - Tool class
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  private enableShortcut(tool: BlockToolConstructable, toolName: string, shortcut: string): void {
    this.Editor.Shortcuts.add({
      name: shortcut,
      handler: (event: KeyboardEvent) => {
        event.preventDefault();
        this.insertNewBlock(tool, toolName);
      },
    });
  }

  /**
   * Creates Flipper instance to be able to leaf tools
   */
  private enableFlipper(): void {
    const tools = Array.from(this.nodes.selectbox.childNodes) as HTMLElement[];

    this.flipper = new Flipper({
      items: tools,
      focusedItemClass: this.CSS.selectboxButtonActive,
    });
  }

  /**
   * Inserts new block
   * Can be called when button clicked on Selectbox or by ShortcutData
   *
   * @param {BlockToolConstructable} tool - Tool Class
   * @param {string} toolName - Tool name
   */
  private insertNewBlock(tool: BlockToolConstructable, toolName: string): void {
    const { BlockManager, Caret } = this.Editor;
    const { currentBlock } = BlockManager;

    if (!currentBlock) return;

    const newBlock = BlockManager.insert({
      tool: toolName,
      replace: currentBlock.isEmpty,
    });

    /**
     * Apply callback before inserting html
     */
    newBlock.call(BlockToolAPI.APPEND_CALLBACK);

    this.Editor.Caret.setToBlock(newBlock);

    /** If new block doesn't contain inpus, insert new paragraph above */
    if (newBlock.inputs.length === 0) {
      if (newBlock === BlockManager.lastBlock) {
        BlockManager.insertAtEnd();
        Caret.setToBlock(BlockManager.lastBlock);
      } else {
        Caret.setToBlock(BlockManager.nextBlock);
      }
    }
  }
}
