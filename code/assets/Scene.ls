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
      "_$id": "02sqed4s",
      "_$type": "Sprite",
      "name": "backgroundRoot",
      "x": 321.9999999999999,
      "y": 473.0000000000001,
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "d5bbea0a-1696-4dc2-8d55-4c7122947b61",
          "scriptPath": "../src/level/BackgroundRoot.ts",
          "backgrounds": [
            {
              "_$ref": "txcudw5m",
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d"
            },
            {
              "_$ref": "oj72opq1",
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d"
            },
            {
              "_$ref": "mgpiu8rh",
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d"
            },
            {
              "_$ref": "n5pa5irq",
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d"
            }
          ]
        }
      ],
      "_$child": [
        {
          "_$id": "txcudw5m",
          "_$type": "Image",
          "name": "Image(1)",
          "x": -1042,
          "y": -473.0000000000001,
          "width": 2160,
          "height": 1280,
          "skin": "res://4a7d0c91-a6a2-45f7-80a4-2ff5a6745db9",
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d",
              "scriptPath": "../src/level/Background.ts",
              "moveScale": 0.3
            }
          ]
        },
        {
          "_$id": "oj72opq1",
          "_$type": "Image",
          "name": "Image(2)",
          "x": -1042,
          "y": -473.0000000000001,
          "width": 2160,
          "height": 1280,
          "skin": "res://835e933a-514a-4c32-bb5d-0e677df07d8d",
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d",
              "scriptPath": "../src/level/Background.ts",
              "moveScale": 0.6
            }
          ]
        },
        {
          "_$id": "mgpiu8rh",
          "_$type": "Image",
          "name": "Image(3)",
          "x": -1042,
          "y": -473.0000000000001,
          "width": 2160,
          "height": 1280,
          "skin": "res://d090a1d2-cc8f-443e-b800-edffbeac5434",
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d",
              "scriptPath": "../src/level/Background.ts",
              "moveScale": 1
            }
          ]
        },
        {
          "_$id": "n5pa5irq",
          "_$type": "Image",
          "name": "Image(4)",
          "x": -1042,
          "y": -473.0000000000001,
          "width": 2160,
          "height": 1280,
          "skin": "res://d8f443f2-46d6-49fe-8748-f78952938390",
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d",
              "scriptPath": "../src/level/Background.ts",
              "moveScale": 1
            }
          ]
        }
      ]
    },
    {
      "_$id": "g83div3t",
      "_$type": "Sprite",
      "name": "obstacleRoot",
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "44f267ee-7925-4129-8c33-a9f2920d208d",
          "scriptPath": "../src/level/Background.ts",
          "moveScale": 1
        },
        {
          "_$type": "04f66d51-58cc-4740-a1b2-a5330d1fc94b",
          "scriptPath": "../src/level/ObstacleRoot.ts"
        }
      ],
      "_$child": [
        {
          "_$id": "uq8akar9",
          "_$type": "Box",
          "name": "obstacle",
          "x": 334,
          "y": 1147,
          "width": 150,
          "height": 40,
          "bgColor": "rgba(255, 255, 255, 1)"
        },
        {
          "_$id": "0ppn7heo",
          "_$type": "Box",
          "name": "obstacle(1)",
          "x": 608,
          "y": 1147,
          "width": 150,
          "height": 40,
          "bgColor": "rgba(255, 255, 255, 1)"
        },
        {
          "_$id": "excvlxmt",
          "_$type": "Box",
          "name": "obstacle(2)",
          "x": 970,
          "y": 1141,
          "width": 150,
          "height": 40,
          "bgColor": "rgba(255, 255, 255, 1)"
        },
        {
          "_$id": "ktcjmth5",
          "_$type": "Box",
          "name": "obstacle(3)",
          "x": 1244,
          "y": 1133,
          "width": 150,
          "height": 40,
          "bgColor": "rgba(255, 255, 255, 1)"
        },
        {
          "_$id": "0066z7fi",
          "_$type": "Box",
          "name": "obstacle(4)",
          "x": 1626,
          "y": 1135,
          "width": 150,
          "height": 40,
          "bgColor": "rgba(255, 255, 255, 1)"
        }
      ]
    },
    {
      "_$id": "iig1hp5z",
      "_$prefab": "71cac087-be04-4e1c-af5c-d7dce6e12802",
      "name": "Player",
      "active": true,
      "x": 131.00000000000006,
      "y": 1056,
      "visible": true
    },
    {
      "_$id": "bwewqklu",
      "_$type": "Sprite",
      "name": "LevelCamera",
      "x": 321.9999999999999,
      "y": 845,
      "width": 100,
      "height": 100,
      "_$comp": [
        {
          "_$type": "dbaae76a-a75c-4382-a42b-2cd24de86b01",
          "scriptPath": "../src/level/LevelCamera.ts",
          "player": {
            "_$ref": "iig1hp5z",
            "_$type": "cddd039b-38f1-49c0-9946-08429b716ebf"
          },
          "backgroundRoot": {
            "_$ref": "02sqed4s",
            "_$type": "d5bbea0a-1696-4dc2-8d55-4c7122947b61"
          },
          "obstacleRoot": {
            "_$ref": "g83div3t",
            "_$type": "04f66d51-58cc-4740-a1b2-a5330d1fc94b"
          }
        }
      ]
    }
  ]
}