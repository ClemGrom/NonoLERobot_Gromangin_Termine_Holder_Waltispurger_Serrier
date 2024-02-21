<script>
import go from 'gojs';
import { GuidedDraggingTool } from "gojs/extensionsJSM/GuidedDraggingTool.ts";

export default {
  name: 'GojsDiagram',
  mounted() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, this.$refs.diagramDiv, {
      "undoManager.isEnabled": true,
      "grid.visible": false,
      "grid.gridCellSize": new go.Size(300, 300),
      draggingTool: new GuidedDraggingTool(),
    });

    diagram.nodeTemplate = $(
        go.Node, "Table",
        {
          locationObjectName: "BODY",
          locationSpot: go.Spot.Center,
          selectionObjectName: "BODY",
          movable: false,
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),

        $(go.Panel, "Auto",
            {
              row: 1, column: 1, name: "BODY",
              stretch: go.GraphObject.Fill
            },
            $(go.Shape, "RoundedRectangle",
                {
                  fill: "red", stroke: null, strokeWidth: 0,
                  minSize: new go.Size(200, 100),
                  margin: 10,
                  parameter1: 20
                }),
            $(go.TextBlock,
                {
                  margin: 10,
                  textAlign: "center",
                  verticalAlignment: go.Spot.Top,
                  font: "bold 14px Segoe UI,sans-serif",
                  stroke: "#484848",
                  editable: true
                },
                new go.Binding("text", "name").makeTwoWay()),

            $(go.TextBlock,
                {
                  margin: 10,
                  textAlign: "top",
                  verticalAlignment: go.Spot.Top,
                  font: "italic 14px Segoe UI,sans-serif",
                  stroke: "#484848",
                  editable: false,
                  text: "Sensibilité du capteur (entre 0 & 2): "
                }),
            $(go.TextBlock, //Moteur
                {
                  margin: 10,
                  textAlign: "left",
                  verticalAlignment: go.Spot.Top,
                  font: "bold 14px Segoe UI,sans-serif",
                  stroke: "#484848",
                  editable: false
                },
                new go.Binding("text", "name").makeTwoWay())
        ),

        $(go.Panel, "Horizontal",
            new go.Binding("itemArray", "topArray"),
            {
              row: 0, column: 1,
              itemTemplate:
                  $(go.Panel,
                      {
                        _side: "top",
                        fromSpot: go.Spot.Top, toSpot: go.Spot.Top,
                        fromLinkable: false, toLinkable: true, cursor: "pointer",
                      },
                      new go.Binding("portId", "portId"),
                      $(go.Shape, "Rectangle",
                          {
                            stroke: null, strokeWidth: 0,
                            desiredSize: new go.Size(8, 8),
                            margin: new go.Margin(0, 1)
                          },
                          new go.Binding("fill", "portColor"))
                  )
            }
        ),

        $(go.Panel, "Horizontal",
            new go.Binding("itemArray", "bottomArray"),
            {
              row: 2, column: 1,
              itemTemplate:
                  $(go.Panel,
                      {
                        _side: "bottom",
                        fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom,
                        fromLinkable: true, toLinkable: false, cursor: "pointer",
                      },
                      new go.Binding("portId", "portId"),
                      $(go.Shape, "Rectangle",
                          {
                            stroke: null, strokeWidth: 0,
                            desiredSize: new go.Size(8, 8),
                            margin: new go.Margin(0, 1)
                          },
                          new go.Binding("fill", "portColor")
                      )
                  )
            }
        )
    );

    diagram.startTransaction('new object');
    diagram.model.addNodeData({});
    diagram.model.addNodeData({});
    diagram.commitTransaction('new object');
  },
  methods: {
    save() {
      const diagram = this.$refs.diagramDiv;
      const model = diagram.model;
      document.getElementById("mySavedModel").value = model.toJson();
    },
    handleImport() {
      const fileInput = document.getElementById('jsonFile');
      fileInput.click();
    },
    handleExport() {
      console.log(this.$refs.diagramDiv)
      const diagram = this.$refs.diagramDiv;
      console.log(diagram)
      const model = diagram.model;
      const link = document.createElement('a');
      link.download = 'diagram.json';
      const json = model.toJson();
      const blob = new Blob([json], {type: 'application/json'});
      link.href = window.URL.createObjectURL(blob);
      link.click();
    }
  }
};
</script>

<template>
  <div class="container">
    <h1>Test GoJS et de ses diagrammes</h1>
    <div id="myDiagramDiv" ref="diagramDiv"></div>

    <div>
      <button class="button" @click="save">Save</button>
      <button class="button" @click="handleImport">Import</button>
      <button class="button" @click="handleExport">Export</button>
    </div>

    <label for="mySavedModel"></label>
    <textarea id="mySavedModel" style="width:100%;height:200px;"></textarea>

    <input type="file" id="jsonFile" accept=".json" style="display: none;"/>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
}

#myDiagramDiv {
  border: 1px solid black;
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  position: relative;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

textarea {
  width: 100%;
  height: 5px;
  resize: vertical;
  box-sizing: border-box;
  padding: 1px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input[type="file"] {
  display: none;
}
</style>
