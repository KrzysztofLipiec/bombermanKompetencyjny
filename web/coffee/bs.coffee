class BS

    constructor: ->
        stage = new PIXI.Stage(0x66FF99)

        renderer = PIXI.autoDetectRenderer(400, 300)

        console.log(renderer)
        document.body.appendChild(renderer.view)

    frame: ->
        setTimeout(@frame.bind(@), 60/1000)
