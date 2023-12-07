{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$runtime": "res://98f54826-e04b-4b52-8144-9775e19253d5",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Root",
  "_$comp": [
    {
      "_$type": "7bad1742-6eed-4d8d-81c0-501dc5bf03d6",
      "scriptPath": "../src/Main.ts"
    }
  ],
  "_$child": [
    {
      "_$id": "y9azuesr",
      "_$var": true,
      "_$type": "Text",
      "name": "txtState",
      "x": 342,
      "y": 357,
      "width": 120,
      "height": 30,
      "text": "Text",
      "fontSize": 20,
      "color": "#FFFFFF",
      "leading": 2
    },
    {
      "_$id": "dwzj6vqm",
      "_$var": true,
      "_$type": "Tab",
      "name": "tab",
      "x": 13,
      "y": 461,
      "width": 700,
      "height": 35,
      "_mouseState": 2,
      "skin": "res://9eb4836d-78c4-4be3-aa53-70a613fef28d",
      "stateNum": 1,
      "labels": "open,close,lock,unlock,break",
      "space": 15,
      "selectedIndex": 0,
      "labelFont": null,
      "labelSize": 20,
      "labelStroke": null,
      "labelStrokeColor": null,
      "labelAlign": null,
      "strokeColors": null
    },
    {
      "_$id": "q1ftpwyx",
      "_$type": "Sprite",
      "name": "Sprite",
      "x": 351.99999999999994,
      "y": 170,
      "width": 100,
      "height": 100
    },
    {
      "_$id": "bpwdopwa",
      "_$type": "Sprite",
      "name": "Boot",
      "x": 318,
      "y": 276,
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "ff98e29a-3e94-41c3-b4f2-b652e2bd33c2",
          "scriptPath": "../src/Boot.ts",
          "text": ""
        }
      ]
    }
  ]
}