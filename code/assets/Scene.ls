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
          "backgroundRootPrefab": {
            "_$uuid": "c87d95ec-40e6-4d9e-8873-c792ed072d99",
            "_$type": "Prefab"
          },
          "testLevelPrefab": {
            "_$uuid": "22bacdad-5bc3-4ab4-99ea-89201788de40",
            "_$type": "Prefab"
          },
          "playerPrefab": {
            "_$uuid": "71cac087-be04-4e1c-af5c-d7dce6e12802",
            "_$type": "Prefab"
          }
        }
      ]
    }
  ]
}