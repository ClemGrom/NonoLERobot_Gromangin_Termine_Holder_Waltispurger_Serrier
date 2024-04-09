<template>
  <div>
    <h1>Robot Model</h1>
    <div ref="paper" style="width: 800px; height: 600px; border: 1px solid #aaa;"></div>
  </div>
</template>

<script>
import * as joint from 'jointjs';

export default {
  mounted() {
    const paper = new joint.dia.Paper({
      el: this.$refs.paper,
      width: 800,
      height: 600,
    });

    // Dimensions et positionnement du rectangle principal
    const rectWidth = 500;
    const rectHeight = 300;
    const rectX = (paper.options.width - rectWidth) / 2;
    const rectY = (paper.options.height - rectHeight) / 2;

    // Ajout du rectangle principal
    const rect = new joint.shapes.standard.Rectangle({
      position: { x: rectX, y: rectY },
      size: { width: rectWidth, height: rectHeight, model: graph },
      attrs: {
        body: {
          fill: 'lightgray',
        },
        label: {
          text: 'Robot',
          fill: 'black',
          fontSize: 25,
          fontWeight: 'bold',
        },
      },
    });

    // Ajout des capteurs
    const sensorWidth = 50;
    const sensorHeight = 20;
    const sensorOffset = 30; // Espacement entre les capteurs et le bord supérieur du rectangle principal

    const sensor1 = new joint.shapes.standard.Rectangle({
      position: { x: rectX + 50, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'orange',
        },
        label: {
          text: 'Sensor 1',
          fill: 'black',
          fontSize: 16,
        },
      },
    });

    const sensor2 = new joint.shapes.standard.Rectangle({
      position: { x: rectX + rectWidth - sensorWidth - 50, y: rectY - sensorHeight - sensorOffset },
      size: { width: sensorWidth, height: sensorHeight },
      attrs: {
        body: {
          fill: 'orange',
        },
        label: {
          text: 'Sensor 2',
          fill: 'black',
          fontSize: 16,
        },
      },
    });

    // Ajout des éléments au graphique

    graph.addCell(rect);
    graph.addCell(sensor1);
    graph.addCell(sensor2);

    paper.model = graph;
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant ici */
</style>
