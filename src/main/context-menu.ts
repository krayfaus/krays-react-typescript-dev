import { Menu, app, shell } from 'electron';

const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [];

// Edit Menu
template.push({
    label: 'Edit',
    submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' }
    ]
});

// View Menu
template.push({
    label: 'View',
    submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
    ]
});

// Window menu
template.push({
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
});

// Help menu
template.push({
    role: 'help',
    submenu: [
        {
            label: 'About',
            click()
            {
                void shell.openExternal('https://github.com/krayfaus');
            }
        }
    ]
});

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services', submenu: [] },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });

    // Edit menu
    if (template[1] && template[1].submenu) {
        template[1].submenu = [
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startSpeaking' },
                    { role: 'stopSpeaking' }
                ]
            }
        ];
    }

    // Window menu
    template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
    ];
}

app.on('ready', () =>
{
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});