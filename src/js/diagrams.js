function init() {

    const $ = go.GraphObject.make;
    const myDiagram = new go.Diagram("myDiagramDiv", {"undoManager.isEnabled": true});

    myDiagram.addDiagramListener("Modified", e => {
        const button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        const idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.slice(0, idx);
        }
    });

    const portSize = new go.Size(8, 8);
    myDiagram.nodeTemplate =
        $(go.Node, "Table",
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
                        margin : 10,


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
                    },),
                $(go.TextBlock, //Moteur
                    {
                        margin: 10,
                        textAlign: "left",  // aligne le texte à gauche
                        verticalAlignment: go.Spot.Top,  // aligne le texte en haut
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
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}

function save() {

    localStorage.setItem("savedModel", myDiagram.model.toJson());
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}

function Import(name) {
    const fileInput = document.getElementById('jsonFile');
    fileInput.click();
    fileInput.onchange = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = event.target.result;
            document.getElementById("mySavedModel").value = data;
            myDiagram.model = go.Model.fromJson(data);
        };
        reader.readAsText(file);
    }
}

function Export(name) {
    let data = document.getElementById("mySavedModel").value;
    let j = document.createElement("a");
    j.download = "sauvegarde_Configuration_Robot_" + Date.now() + ".json";
    j.href = URL.createObjectURL(new Blob([data], {type: "application/json"}));
    j.click();
}

window.addEventListener('DOMContentLoaded', init);