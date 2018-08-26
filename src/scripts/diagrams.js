const diagram = {
    initialize: async () => {
        try {
            console.log(await diagram.get());
        }
        catch (e) {
            console.log(e);
        }
    },

    get: async () => {
        try {
            return getComputedStyle(document.querySelector('.diagrams_image svg')).height;
        }
        catch (e) {
            console.log(e);
        }
    },

    set: async () => {

    }
};


// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         diagram.initialize();
//     }
//     catch (e) {
//         console.log(e);
//     }
// });

module.exports = diagram;