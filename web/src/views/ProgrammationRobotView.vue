<template>
  <div>
  
    <div ref="paper" style="width: 600px; height: 500px; border: 1px solid #aaa; background-color: white;" ></div>
  </div>
</template>

<script>
import * as joint from 'jointjs';


export default {
  mounted() {
    const graph = new joint.dia.Graph(); 

    const paper = new joint.dia.Paper({
      el: this.$refs.paper,
      width: 600,
      height: 500,
      model: graph,
    });

    // Dimensions et positionnement du rectangle principal
    const rectWidth = 400;
    const rectHeight = 250;
    const rectX = (paper.options.width - rectWidth) / 2;
    const rectY = (paper.options.height - rectHeight) / 2;

    const rect = new joint.shapes.standard.Rectangle({
      position: { x: rectX, y: rectY },
      size: { width: rectWidth, height: rectHeight },
      attrs: {
        body: {
          fill: 'red',
          rx: 10,
          ry: 10, 
        },
        label: {
          text: 'Nono',
          fill: 'white',
          fontSize: 25,
          fontWeight: 'bold',
        },
      },
    });

    // Ajout des capteurs
    const sensorWidth = 100;
    const sensorHeight = 100;
    const sensorOffset = 0; // Espacement entre les capteurs et le bord supérieur du rectangle principal

    const sensor1 = new joint.shapes.standard.Rectangle({
      position: { x: rectX + 50, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'green',
          rx: 10,
          ry: 10, 
        },
        label: {
          text: 'Capteur 1',
          fill: 'white',
          fontSize: 16,
        },
      },

    });

    const sensor2 = new joint.shapes.standard.Rectangle({
      position: { x: rectX + rectWidth - sensorWidth - 50, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'green',
          rx: 10,
          ry: 10, 
        },
        label: {
          text: 'Capteur 2',
          fill: 'white',
          fontSize: 16,
        },
      },
    });



    // Ajout des éléments au graphique

    graph.addCell(rect);
    graph.addCell(sensor1);
    graph.addCell(sensor2);


    // Dimensions et positionnement des carrés
    const squareWidth = 120;
    const squareHeight = 120;

    // Ajout du carré à gauche
    const leftSquare = new joint.shapes.standard.Rectangle({
      position: { x: rectX - squareWidth + 50, y: rectY + 100 },
      size: { width: squareWidth, height: squareHeight },
      attrs: {
        body: {
          fill: 'lightgray',
          rx: 10,
          ry: 10, 
        },
        label: {
          text: 'Moteur gauche',
          fill: 'black',
          fontSize: 16,
        },
      },
    });

    // Ajout du carré à droite
    const rightSquare = new joint.shapes.standard.Rectangle({
      position: { x: rectX + rectWidth - 50, y: rectY + 100 },
      size: { width: squareWidth, height: squareHeight },
      attrs: {
        body: {
          fill: 'lightgray',
          rx: 10,
          ry: 10, 
        },
        label: {
          text: 'Moteur droit',
          fill: 'black',
          fontSize: 16,
        },
      },
    });

    // Ajout des carrés au graphique
    graph.addCell(leftSquare);
    graph.addCell(rightSquare);


    // Créer une flèche du capteur 1 au moteur gauche
    const link1 = new joint.shapes.standard.Link({
      source: { id: sensor1.id },
      target: { id: leftSquare.id },
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });

    // Créer une flèche du capteur 2 au moteur droit
    const link2 = new joint.shapes.standard.Link({
      source: { id: sensor2.id },
      target: { id: rightSquare.id },
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 10 -5 0 0 10 5 z'
          }
        }
      }
    });

    // Ajouter les flèches au graphique
    graph.addCell(link1);
    graph.addCell(link2);
    paper.model = graph;
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant ici */
</style>
