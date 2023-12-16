{
  "_$ver": 1,
  "_$id": "lx8mwule",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Root",
  "_$comp": [
    {
      "_$type": "ff98e29a-3e94-41c3-b4f2-b652e2bd33c2",
      "scriptPath": "../src/Boot.ts",
      "loadingPrefab": {
        "_$uuid": "62458a87-76ec-4cf5-8c59-e530d7142755",
        "_$type": "Prefab"
      },
      "levelLoader": {
        "_$ref": "o2x7b8qz",
        "_$type": "4aed0491-68f4-4b0a-a959-fcfc5204605d"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "o2x7b8qz",
      "_$type": "Sprite",
      "name": "LevelLoader",
      "active": false,
      "x": 325.00000000000006,
      "y": 183.9999999999999,
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "4aed0491-68f4-4b0a-a959-fcfc5204605d",
          "scriptPath": "../src/LevelLoader.ts",
          "playerPrefab": {
            "_$uuid": "71cac087-be04-4e1c-af5c-d7dce6e12802",
            "_$type": "Prefab"
          },
          "testLevelPrefab": {
            "_$uuid": "22bacdad-5bc3-4ab4-99ea-89201788de40",
            "_$type": "Prefab"
          },
          "backgroundRootPrefab": {
            "_$uuid": "c87d95ec-40e6-4d9e-8873-c792ed072d99",
            "_$type": "Prefab"
          }
        }
      ]
    },
    {
      "_$id": "gib7vr2y",
      "_$type": "Box",
      "name": "Box",
      "width": 720,
      "height": 1280,
      "_mouseState": 2,
      "_$child": [
        {
          "_$id": "itanwfpf",
          "_$type": "Image",
          "name": "Image",
          "x": 110,
          "y": 202,
          "width": 500,
          "height": 705,
          "centerX": 0,
          "skin": "res://ce260562-333c-46e4-9513-c757b208267a",
          "color": "#ffffff"
        },
        {
          "_$id": "y68ondg6",
          "_$var": true,
          "_$type": "Image",
          "name": "imgNewRecord",
          "x": 270,
          "y": 245,
          "width": 180,
          "height": 48,
          "centerX": 0,
          "skin": "res://8e48f8d6-644e-461c-84f5-153f70a800d7",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "0k0kz41p",
              "_$type": "Label",
              "name": "Label(4)",
              "x": -160,
              "y": 1.0000000000000568,
              "width": 500,
              "height": 50,
              "centerX": 0,
              "text": "新纪录！",
              "fontSize": 32,
              "color": "#FFFFFF",
              "italic": true,
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "6a2ktkbh",
          "_$type": "Label",
          "name": "Label",
          "x": 110,
          "y": 324,
          "width": 500,
          "height": 50,
          "centerX": 0,
          "text": "本局最高",
          "fontSize": 46,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "u5pbgv09",
          "_$var": true,
          "_$type": "Label",
          "name": "lblCurrentScore",
          "x": 110,
          "y": 425,
          "width": 500,
          "height": 50,
          "centerX": 0,
          "text": "10\n",
          "fontSize": 70,
          "color": "#FFFFFF",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0",
          "stroke": 9
        },
        {
          "_$id": "ls4wbu5x",
          "_$type": "Label",
          "name": "Label(2)",
          "x": 111,
          "y": 614.9999999999999,
          "width": 500,
          "height": 50,
          "centerX": 1,
          "text": "历史最高",
          "fontSize": 38,
          "color": "#FFFFFF",
          "italic": true,
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "222ze3yr",
          "_$var": true,
          "_$type": "Label",
          "name": "lblHistoryScore",
          "x": 111,
          "y": 716.0000000000001,
          "width": 500,
          "height": 50,
          "centerX": 1,
          "text": "10\n",
          "fontSize": 70,
          "color": "#FFFFFF",
          "bold": true,
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0",
          "stroke": 9
        },
        {
          "_$id": "7wy1k175",
          "_$type": "Button",
          "name": "btnResume",
          "x": 111,
          "y": 928,
          "width": 500,
          "height": 70,
          "_mouseState": 2,
          "centerX": 1,
          "stateNum": 1,
          "skin": "res://d073c4ed-afcb-4a17-b09b-8bd6ddb03d74",
          "label": "继续",
          "labelSize": 32,
          "labelBold": true,
          "labelPadding": "10,0,0,0"
        },
        {
          "_$id": "2rpmb67c",
          "_$type": "Button",
          "name": "btnMainMenu",
          "x": 110,
          "y": 1018,
          "width": 500,
          "height": 70,
          "_mouseState": 2,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://d073c4ed-afcb-4a17-b09b-8bd6ddb03d74",
          "label": "主界面",
          "labelSize": 32,
          "labelBold": true,
          "labelPadding": "10,0,0,0"
        },
        {
          "_$id": "xmy4vebt",
          "_$type": "Button",
          "name": "btnRestart",
          "x": 110,
          "y": 1108,
          "width": 500,
          "height": 70,
          "_mouseState": 2,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://d073c4ed-afcb-4a17-b09b-8bd6ddb03d74",
          "label": "重新开始",
          "labelSize": 32,
          "labelBold": true,
          "labelPadding": "10,0,0,0"
        }
      ]
    }
  ]
}