import {Plugin, SettingsTypes} from "@highlite/plugin-api";

import Bronze_scimitar from '../resources/images/customCursor/customCursor/Bronze_scimitar.png';
import Celadon_scimitar from '../resources/images/customCursor/customCursor/Celadon_scimitar.png';
import Chicken_39 from '../resources/images/customCursor/customCursor/Chicken_39.png';
import Chisel from '../resources/images/customCursor/customCursor/Chisel.png';
import Coronium_scimitar from '../resources/images/customCursor/customCursor/Coronium_scimitar.png';
import Damoguis_staff from '../resources/images/customCursor/customCursor/Damoguis_staff.png';
import Ember_staff from '../resources/images/customCursor/customCursor/Ember_staff.png';
import Fires_Fury from '../resources/images/customCursor/customCursor/Fires_Fury.png';
import Forest_staff from '../resources/images/customCursor/customCursor/Forest_staff.png';
import Gnomes_hat from '../resources/images/customCursor/customCursor/Gnomes_hat.png';
import Golden_leaf from '../resources/images/customCursor/customCursor/Golden_leaf.png';
import Hydro_staff from '../resources/images/customCursor/customCursor/Hydro_staff.png';
import Iron_scimitar from '../resources/images/customCursor/customCursor/Iron_scimitar.png';
import Knife from '../resources/images/customCursor/customCursor/Knife.png';
import Leaf from '../resources/images/customCursor/customCursor/Leaf.png';
import Legendary_scimitar from '../resources/images/customCursor/customCursor/Legendary_scimitar.png';
import Marlin from '../resources/images/customCursor/customCursor/Marlin.png';
import Natures_Fury from '../resources/images/customCursor/customCursor/Natures_Fury.png';
import Palladium_scimitar from '../resources/images/customCursor/customCursor/Palladium_scimitar.png';
import Raw_marlin from '../resources/images/customCursor/customCursor/Raw_marlin.png';
import Rooster_117 from '../resources/images/customCursor/customCursor/Rooster_117.png';
import Shovel from '../resources/images/customCursor/customCursor/Shovel.png';
import Steel_scimitar from '../resources/images/customCursor/customCursor/Steel_scimitar.png';
import Waters_Fury from '../resources/images/customCursor/customCursor/Waters_Fury.png';


export class CustomCursor extends Plugin {
    pluginName: string = 'Custom Cursor';
    author = '0rangeYouGlad';

    constructor() {
        super();

        this.settings.cursorOffset = {
            text: 'Cursor Offset',
            type: SettingsTypes.text,
            value: "auto",
            callback: this.reset_cursor,
        } as any;

        this.settings.cursorImportant = {
            text: 'Cursor Important (Hover and Click)',
            type: SettingsTypes.checkbox,
            value: true,
            callback: this.reset_cursor,
        } as any;

        this.settings.cursorImagePresets = {
            text: 'Cursor Presets',
            type: SettingsTypes.range,
            value: 1,
            callback: this.reset_cursor,
        } as any;

        this.settings.cursorCustomImage = {
            text: 'Cursor Custom Image',
            type: SettingsTypes.text,
            value: "",
            callback: this.reset_cursor,
        } as any;
    }

    // Don't think it's feasible to use the copy alredy in the game files unfortunately, need a separate png
    private images = [
        Legendary_scimitar,
        Celadon_scimitar,
        Coronium_scimitar,
        Palladium_scimitar,
        Steel_scimitar,
        Iron_scimitar,
        Bronze_scimitar,
        Damoguis_staff,
        Hydro_staff,
        Forest_staff,
        Ember_staff,
        Waters_Fury,
        Natures_Fury,
        Fires_Fury,
        Leaf,
        Golden_leaf,
        Chicken_39,
        Rooster_117,
        Raw_marlin,
        Marlin,
        Shovel,
        Chisel,
        Knife,
        Gnomes_hat
      ]

    get_png_from_preset() {
        if(this.images[this.settings.cursorImagePresets.value]) {
            return `${this.images[this.settings.cursorImagePresets.value]}`;
        }
        return this.images[0];
    }

    get_cursor_url() {
        return `url(${this.settings.cursorCustomImage.value || this.get_png_from_preset()})`
    }

    init(): void {
        this.log('Initialized CustomCursor');
    }

    start(): void {
        this.log('Started CustomCursor');
        if(this.settings.enable.value) {
            this.set_cursor()
        }
    }

    stop(): void {
        this.log('Stopped CustomCursor');
        this.clear_cursor();
    }

    private addCSSStyles(cursorName?: string): void {
        const preexistingStyle = document.head.querySelector('#cursorStyle');
        if(preexistingStyle) {
            document.head.removeChild(preexistingStyle);
        }
        if(cursorName) {
            const style = document.createElement('style');
            style.id = "cursorStyle";
            style.textContent = `
                .hs-screen-mask {
                    cursor: ${cursorName};
                }
                :hover {
                    cursor: ${cursorName};
                }
                html {
                    cursor: ${cursorName};
                }
            `;
            document.head.appendChild(style);
        }
    }

    set_cursor() {
        if(this.settings.enable.value) {
            this.addCSSStyles(`${this.get_cursor_url()}, ${this.settings.cursorOffset.value || 'auto'} ${this.settings.cursorImportant.value ? '!important' : ''}`);
        }
    }

    reset_cursor() {
        this.clear_cursor();
        this.set_cursor();
    }

    clear_cursor() {
        this.addCSSStyles();
    }
}
