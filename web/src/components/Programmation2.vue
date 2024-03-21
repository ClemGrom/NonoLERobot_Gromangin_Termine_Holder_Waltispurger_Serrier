<script>
import * as go from 'gojs';

export default {
  data() {
    return {
      diagram: null,
      nodeDataArray: [],
      linkDataArray: []
    };
  },
  mounted() {
    this.initDiagram();
  },
  methods: {
    initDiagram() {
      const $ = go.GraphObject.make;
      this.diagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });

      // Définir le modèle de nœuds et de liens
      this.diagram.nodeTemplate = $(
          go.Node,
          'Auto',
          $(go.Shape, 'Rectangle', { fill: 'lightblue' }),
          $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'name'))
      );

      // Charger le modèle depuis le texte JSON
      this.diagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value);
    },
    save() {
      localStorage.setItem('savedModel', this.diagram.model.toJson());
      document.getElementById('mySavedModel').value = this.diagram.model.toJson();
      this.diagram.isModified = false;
    },
    importDiagram() {
      const fileInput = document.getElementById('jsonFile');
      fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        document.getElementById('mySavedModel').value = data;
        this.diagram.model = go.Model.fromJson(data);
      };
      reader.readAsText(file);
    },
    exportDiagram() {
      const data = document.getElementById('mySavedModel').value;
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `sauvegarde_Configuration_Robot_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>

<template>
  <div>
    <h1>Test GoJS et de ses diagrammes</h1>
    <div id="myDiagramDiv" style="width: 500px; height: 400px; border: 1px solid black;" class></div>

    <div>
      <button @click="save">Save</button>
      <button @click="importDiagram">Import</button>
      <button @click="exportDiagram">Export</button>
    </div>

    <label for="mySavedModel"></label>
    <textarea id="mySavedModel" style="width: 100%; height: 5px;"></textarea>

    <input type="file" id="jsonFile" accept=".json" style="display: none;" @change="handleFileChange">
  </div>
</template>
<style scoped>

</style>