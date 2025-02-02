/** @type { import('@storybook/svelte').Preview } */

import "../src/lib/styles/foundation.css";

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
