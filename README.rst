=====
PlexMap Masterportal Addon
=====

This addon simply provides buttons to toggle a Plexmap 3D View inside the Masterportal.


Installation
============

To install the Plexmap Masterportal Addon, you have to clone it to your Masterportal installation.

.. code-block:: console

    cd /path/to/your/masterportal
    git clone 

To Register the Buttons please import PlexmapViewer to the indexControl.js 

.. code-block:: console
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

.. code-block:: console

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