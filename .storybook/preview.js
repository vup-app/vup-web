/** @type { import('@storybook/svelte').Preview } */

import "../src/lib/styles/foundation.css";
import "../src/lib/styles/storybook.css";

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
