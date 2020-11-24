import Module from '../__module';
import * as _ from '../utils';
import $ from '../dom';

/**
 * Icons importations from FontAwesome
 */
import { faBold, IconDefinition } from '@fortawesome/pro-light-svg-icons';

/**
 * @module Editor.js DefaultTools Submodule
 *
 * Creates Instances from Plugins and binds external config to the instances
 */

/**
 * Class properties:
 *
 * @typedef {DefaultTools} DefaultTools
 * @property {DefaultTools[]} toolsAvailable - available DefaultTools
 * @property {DefaultTools[]} toolsUnavailable - unavailable DefaultTools
 * @property {object} toolsClasses - all classes
 * @property {object} toolsSettings - DefaultTools settings
 * @property {EditorConfig} config - Editor config
 */
export default class DefaultTools extends Module {

  /**
   * Elements
   */
  private nodes: {
    plusButton: HTMLLIElement,
    boldButton: HTMLLIElement,
    italicButton: HTMLLIElement
  } = {
    plusButton: undefined,
    boldButton: undefined,
    italicButton: undefined
  };

  /**
   * Function responsible to render all buttons inside Toolbox in that order
   */
  public get renderAll(): void {
    this.addBoldButton;
    this.addItalicButton;
    this.addPlusButton;
    return;
  }

  /**
   * Make plus button for Toolbox
   */
  public get addPlusButton(): void {
    this.nodes.plusButton = document.createElement('li') as HTMLLIElement;
    this.nodes.plusButton.classList.add(this.Editor.Toolbox.CSS.toolboxButton);
    this.nodes.plusButton.appendChild($.svg('plus', 14, 16));

    this.Editor.Toolbox.nodes.toolbox.appendChild(this.nodes.plusButton);
    this.Editor.Toolbox.nodes.buttons.push(this.nodes.plusButton);

    /**
     * Add click listener
     */
    this.Editor.Listeners.on(this.nodes.plusButton, 'click', (event: KeyboardEvent | MouseEvent) => {
      this.Editor.Selectbox.toggle();
    });

    /**
     * Add listeners to show/hide toolbox tooltip
     */
    /*const tooltipContent = this.drawTooltip(toolName);

    this.Editor.Tooltip.onHover(plusButton, tooltipContent, {
      placement: 'bottom',
      hidingDelay: 200,
    });*/
    return;
  }

  public get addBoldButton(): void {
    this.nodes.boldButton = document.createElement('li') as HTMLLIElement;
    this.nodes.boldButton.classList.add(this.Editor.Toolbox.CSS.toolboxButton);
    this.nodes.boldButton.appendChild($.svg('bold', 14, 16));

    console.log('faIcon', faBold);

    this.Editor.Toolbox.nodes.toolbox.appendChild(this.nodes.boldButton);
    this.Editor.Toolbox.nodes.buttons.push(this.nodes.boldButton);

    /**
     * Add click listener
     */
    this.Editor.Listeners.on(this.nodes.boldButton, 'click', (event: KeyboardEvent | MouseEvent) => {
      alert('clicked bold');
    });

    return;
  }

  public get addItalicButton(): void {
    this.nodes.boldButton = document.createElement('li') as HTMLLIElement;
    this.nodes.boldButton.classList.add(this.Editor.Toolbox.CSS.toolboxButton);
    this.nodes.boldButton.appendChild($.svg('italic', 12, 14));

    /**
     * Add click listener
     */
    this.Editor.Listeners.on(this.nodes.boldButton, 'click', (event: KeyboardEvent | MouseEvent) => {
      alert('clicked italic');
    });

    this.Editor.Toolbox.nodes.toolbox.appendChild(this.nodes.boldButton);
    this.Editor.Toolbox.nodes.buttons.push(this.nodes.boldButton);

    return;
  }
}
