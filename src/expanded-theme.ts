// eslint-disable-next-line
import {Palette, PalletteColor} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface PalletteColor {
        [key:number]: string;
    }

    interface Palette {
        tertiary:PaletteColor
    }
}