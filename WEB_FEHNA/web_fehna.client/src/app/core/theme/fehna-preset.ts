import {definePreset, palette} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const primaryPalette = palette('#1FD6F5');
const secondaryPalette = palette('#E23B7A');
const accentPalette = palette('#F2994A');

const surfaceDark = {
  0: '#ffffff',
  50: '#E7EEF6',
  100: '#C9D8E8',
  200: '#9AB4CE',
  300: '#6B8FB0',
  400: '#4C7096',
  500: '#2E5480',
  600: '#24456B',
  700: '#1C3B5E',
  800: '#15304F',
  900: '#0F2038',
  950: '#0A1A2E',
};

export const FehnaPreset = definePreset(Aura, {
  semantic: {
    primary: primaryPalette,
    colorScheme: {
      dark: {
        surface: surfaceDark,
        primary: {
          color: '{primary.500}',
          contrastColor: '#04141F',
          hoverColor: '{primary.400}',
          activeColor: '{primary.300}',
        },
        formField: {
          borderColor: '{surface.700}',
          hoverBorderColor: '{surface.600}',
        },
      },
    },
  },
  components: {
    button: {
      colorScheme: {
        dark: {
          root: {
            secondary: {
              background: secondaryPalette[500],
              hoverBackground: secondaryPalette[400],
              activeBackground: secondaryPalette[600],
              borderColor: secondaryPalette[500],
              hoverBorderColor: secondaryPalette[400],
              activeBorderColor: secondaryPalette[600],
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: secondaryPalette[500],
                shadow: 'none',
              },
            },
          },
        },
      },
    },
    tag: {
      colorScheme: {
        dark: {
          secondary: {
            background: 'color-mix(in srgb, ' + secondaryPalette[500] + ' 20%, transparent)',
            color: secondaryPalette[200],
          },
          warn: {
            background: 'color-mix(in srgb, ' + accentPalette[500] + ' 20%, transparent)',
            color: accentPalette[200],
          },
        },
      },
    },
  },
});
