<script >

import go from 'gojs';
// import {GuidedDraggingTool} from "gojs/extensionsJSM/GuidedDraggingTool.ts";



let $ = go.GraphObject.make;

// Importer la classe GuidedDraggingTool depuis le fichier JavaScript


export default {
  name: 'Diagram',
  mounted() {
    let diagram = $(go.Diagram, this.$refs.diagramDiv, {
      "undoManager.isEnabled": true,
      "grid.visible": false,
      "grid.gridCellSize": new go.Size(300, 300),
      draggingTool: new GuidedDraggingTool(),
    });
    const portSize = new go.Size(16, 16);

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
                            desiredSize: portSize,
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
                            desiredSize: portSize,
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
  }
}
</script>

<template>
  <div class="h-min-screen ">
    <h1> Page de programmation du robot</h1>

    <div id="diagramDiv" style="width: 500px; height: 400px; border: 1px solid black;" class></div>

    <router-link to="/simulation">
      <button class="max-sm:text-xs max-sm:mr-1.5 sm:text-base text-white text-2xl font-bold py-2 px-4 rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 mr-3 hover:transition duration-300 ease-in-out transform hover:scale-105">
        Valider la programmation du robot
      </button>
    </router-link>
  </div>

</template>

<style scoped>

</style>

