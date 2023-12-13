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
      }
    }
  ],
  "_$child": [
    {
      "_$id": "o2x7b8qz",
      "_$type": "Sprite",
      "name": "LoadHelper",
      "active": false,
      "x": 325,
      "y": 184,
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "8d2adf04-dadc-4558-9b65-b226c8178714",
          "scriptPath": "../src/LoadHelper.ts",
          "playerPrefab": {
            "_$uuid": "71cac087-be04-4e1c-af5c-d7dce6e12802",
            "_$type": "Prefab"
          },
          "backgroundRoot": {
            "_$uuid": "c87d95ec-40e6-4d9e-8873-c792ed072d99",
            "_$type": "Prefab"
          },
          "levelCamera": {
            "_$uuid": "f52f13c2-5641-41d9-b595-df58a169bb21",
            "_$type": "Prefab"
          }
        }
      ]
    },
    {
      "_$id": "ruuvev8y",
      "_$type": "Image",
      "name": "Image",
      "width": 720,
      "height": 1280,
      "skin": "res://dd0ec17e-980e-47ca-b8a6-357051a48300",
      "useSourceSize": true,
      "color": "#ffffff"
    }
  ]
}