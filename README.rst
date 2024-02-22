=====
PlexMap Masterportal Addon
=====

This addon provides buttons to toggle a PlexMap View inside the Masterportal.


Installation
============

To install the PlexMap Masterportal Addon, you have to clone it to your Masterportal installation.

.. code-block:: bash

    cd /path/to/your/masterportal/addons
    git clone https://git.geoplex.de/plexmap/masterportal-addons.git



To Register the Buttons please import PlexmapViewer to the indexControl.js 

.. code-block:: bash
    
    import PlexmapViewer from "../../../addons/plexMapViewer/components/PlexmapViewer.vue";
    ....
    state: {
        componentMap: {
            plexmapViewer : PlexmapViewer,
            attributions: AttributionsItem,
            backForward: BackForward,
            freeze: FreezeScreen,
            fullScreen: FullScreen,
            ...
        }
    }

Additonally you have to add "plexmapViewer":true to the controls section of your config.json.

.. code-block:: bash

    "controls": {
        "zoom": true,
        "fullScreen": true,
        "scaleLine": true,
        "mousePosition": true,
        "plexmapViewer": true
        ...
    }

The button to toggle the Plexmaps Viewer should be available in the top right corner 
of the controll section it is currently displayed by a wrentch icon.


The PlexMap Masterportal Addon is now installed and ready to use.

Configuration
=====
The PlexMap Masterportal Addon needs to be configured so it can display your PlaxMap Instanz correctly.
To do so, you have to add some information to the config.js file included in this repository.

.. code-block:: bash

    const Config = {
        API_URL  : 'path/to/your/plexmap/api',
        VIEW_SRC : 'path/to/your/plexmap/view',
        LAYOUT   : 'minimal',
    }

* The API_URL is the path to the PlexMap API. 
* The VIEW_SRC is the path to the PlexMap View. 
* The LAYOUT is the layout style of the PlexMap View. (**Recomendet is minimal**)

Troubleschooting
=====

If you face an issue while cloning the repo with an 
error message like "cloning into a non empty folder is not allowed",
please remove the single file in the addons folder and try again.