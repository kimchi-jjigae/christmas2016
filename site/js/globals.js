var globals = {
    ground: 700,
    hoverPosition: 670,
    hoverLimits: {
        y1: 660,
        y2: 680
    },
    fonts: {
        f1: {
            font: 'bold 56px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        },
        f2: {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        },
        f2_flash: {
            font: 'bold 32px Arial',
            fill: '#ffffff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        },
    },
    recentreText: function(text) {
        text.position.x = text.position.x - text.width / 2;
        text.position.y = text.position.y - text.height / 2;
    }
};
