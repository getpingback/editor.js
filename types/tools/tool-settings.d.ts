import {ToolConfig} from './tool-config';
import {ToolConstructable} from './index';

/**
 * Tool's Toolbox settings
 */
export interface ToolboxConfig {
  /**
   * Tool title for Toolbox
   */
  title?: string;

  /**
   * HTML string with an icon for Toolbox
   */
  icon?: string;
}

/**
 * Tool's Selectbox settings
 */
export interface SelectboxConfig {
  /**
   * Tool title for Selectbox
   */
  title?: string;

  /**
   * HTML string with an icon for Selectbox
   */
  icon?: string;
}

/**
 * Object passed to the Tool's constructor by {@link EditorConfig#tools}
 */
export interface ToolSettings {

  /**
   * Tool's class
   */
  class: ToolConstructable;

  /**
   * User configuration object that will be passed to the Tool's constructor
   */
  config?: ToolConfig;

  /**
   * Is need to show Inline Toolbar.
   * Can accept array of Tools for InlineToolbar or boolean.
   */
  inlineToolbar?: boolean | string[];

  /**
   * Define shortcut that will render Tool
   */
  shortcut?: string;

  /**
   * Tool's Toolbox settings
   * It will be hidden from Toolbox when false is specified.
   */
  toolbox?: ToolboxConfig | false;

  /**
   * Tool's Selectbox settings
   * It will be hidden from Selectbox when false is specified.
   */
  selectbox?: SelectboxConfig | false;
}
