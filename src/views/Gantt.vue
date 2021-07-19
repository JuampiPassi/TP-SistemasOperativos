<template>
  <v-container>
    <v-row justify="center" >
      <v-col cols="6"  >
        <template v-if="this.algoritmo=='Round Robin'"><h2 class="text-center"><b> Round Robin Q: {{this.quantum}}</b></h2></template>
        <template v-else><h2 class="text-center"><b>{{this.algoritmo}}</b></h2></template>
          
        <v-data-table
          dense
          hide-default-footer
          :headers="headers"
          :items="procesos"
          class="elevation-3 mt-5">
      
          <template v-slot:[`body.append`] v-if="this.algoritmo=='Prioridades No Apropiativo' || this.algoritmo=='Prioridades Apropiativo' ">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="text-align-last: center">
                <b>Prom: {{tesperaProm}}</b>
              </td>
            </tr>
          </template>
          <template  v-slot:[`body.append`] v-else>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td style="text-align-last: center">
                <b>Prom: {{tesperaProm}}</b>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
       <v-col cols="12" justify="center" style="text-align: -webkit-center">
        <h4 class="mt-10">Diagrama de Gantt</h4>
        <dx-data-grid class="mt-10"
                
                :data-source="datos"
                :columns="columns"
                :allow-column-reordering="column"
                :allow-column-resizing="true"
                :show-borders="true"
                :columnAutoWidth="true"
                :columnAutoHeight="true"
                :show-column-lines="true"
                :show-row-lines="true"
                :repaint-changes-only="true"
                :row-alternation-enabled="rowAlternationEnabled"
                @cell-prepared="onCellPrepared"
            >
            
          </dx-data-grid>
          <template v-if="this.algoritmo=='Prioridades No Apropiativo' || this.algoritmo=='Prioridades Apropiativo' ">
            <p class="mt-5">Nota: Si dos procesos tienen la misma prioridad se ejecutan por orden de llegada (FIFO)</p>
          </template>
       </v-col>
    </v-row>
    <!--Selector de color -->
    <v-row justify="center" align="center" class="mt-5">
			<v-col class="shrink" style="min-width: 150px;">
        <v-text-field value="Espera" hide-details solo readonly dense>
          <template v-slot:append>
            <v-menu v-model="menuEspera" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <div :style="cambiarColorEspera" v-on="on" />
              </template>
              <v-card>
                <v-card-text class="pa-0">
                  <v-color-picker v-model="colorEspera" flat hide-inputs show-swatches  swatches-max-height="100"/>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
      	<v-col class="shrink" style="min-width: 150px;">
        <v-text-field value="CPU" hide-details solo readonly dense>
          <template v-slot:append>
            <v-menu v-model="menuCPU" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <div :style="cambiarColorCPU" v-on="on" />
              </template>
              <v-card>
                <v-card-text class="pa-0">
                  <v-color-picker v-model="colorCPU" flat hide-inputs show-swatches  swatches-max-height="100"/>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    

  </v-container>
</template>

<script>
import { DxDataGrid } from 'devextreme-vue/data-grid';
export default {
  name: 'Gantt',
  components: {DxDataGrid
  },
  data(){
		return{
      algoritmo:'',
      quantum: '',
      procesos:[],
      headers:[{ text: 'Proceso', value: 'proceso',align:'center',}, 
              { text: 'T.llegada', value: 'llegada',align:'center'},
              { text: 'T.CPU', value: 'cpu',align:'center'},
              { text: 'T.espera', value: 'tespera',align:'center' },
              { text: 'T.servicio', value: 'tservicio',align:'center' },
              { text: 'Indice', value: 'indice',align:'center' }
            ],
      columns:[],
      datos:[],
      tesperaProm: '',
      colorEspera: '#add8e6',
      colorCPU: '#5e9be6fa',
		  menuEspera: false,
      menuCPU: false,
      rowAlternationEnabled: true,
      dataGridRefKey: 1,
      column:true,
      
    }
  },
  methods:{
    GenerarColumnas(){
      //Primero calculo la cantidad de columnas
      let cant=0;
      this.procesos.forEach(proceso => {
        cant=cant+proceso.cpu; 
      });
      
      //Armo las columnas
      this.columns.push({caption: "Proceso", dataField: "nombre", alignment:"center",width:"110"});
      for (let index = 0; index <= cant; index++) {
        this.columns.push({caption: index.toString(), dataField: index.toString(), alignment:"start",width:"50",})
      }
      
      if(this.algoritmo=="FCFS" || this.algoritmo=="SJF" || this.algoritmo=="Prioridades No Apropiativo"){//Genero los datos
        
           this.procesos.forEach(proceso => {
             let dato={};
             dato.nombre=proceso.proceso;
             
              for (let i=proceso.llegada; i<=proceso.tespera+proceso.llegada; i++ ) {//espera
               dato[i]="0"
             }
              for (let j=proceso.tespera+proceso.llegada; j<proceso.tservicio+proceso.llegada; j++ ) {//cpu
               dato[j]="1";
             }
             this.datos.push(dato);
           });
      }else{
        
        this.procesos.forEach(proceso => {
          let dato={};
          dato.nombre=proceso.proceso;
          let c=0;
          for (let i=proceso.llegada; i<proceso.tservicio+proceso.llegada; i++ ) {
            dato[i]=proceso.salida[c];
            c++;
          }
          this.datos.push(dato);
        });
      }
    },
     onCellPrepared(e) {
       
        if (e.text === "1"){
           e.cellElement.style.background= this.colorCPU;
           e.cellElement.style.color=this.colorCPU
        }
        if (e.text=="0"){
          e.cellElement.style.background= this.colorEspera;
          e.cellElement.style.color=this.colorEspera
        }  
    } 
  },
  computed:{
    cambiarColorEspera() {
      if(this.rowAlternationEnabled==false){
        this.rowAlternationEnabled=true;
      }else{this.rowAlternationEnabled=false;}
      const { colorEspera, menu } = this
      return {
        backgroundColor: colorEspera,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    },
    cambiarColorCPU() {
       if(this.column==true){
        this.column=false;
      }else{this.column=true;}
      const { colorCPU, menu } = this
      return {
        backgroundColor: colorCPU,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      }
    },
   
    
    
  },
  mounted(){
    switch (this.$route.params.id) {
            case '0':
                this.algoritmo="FCFS"
                break;
            case '1':
                this.algoritmo="SJF"
                break;
            case '2':
                this.algoritmo="SRTF"
                break;
            case '3':
                this.algoritmo="Round Robin";
                this.quantum=localStorage.getItem('quantum');
                break;   
            case '4':
                this.algoritmo="Prioridades No Apropiativo";
                this.headers.splice(3, 0,{text: 'Prioridad', value: 'prioridad',align:'center' } );//Agrego la columna prioridad
                break; 
            case '5':
                this.algoritmo="Prioridades Apropiativo";
                this.headers.splice(3, 0,{text: 'Prioridad', value: 'prioridad',align:'center' } );//Agrego la columna prioridad
                break; 
        }
    this.procesos=JSON.parse(localStorage.getItem('procesos'));
    let suma=0;
    this.procesos.forEach(proceso => {
      suma=suma+proceso.tespera;
    });
    this.tesperaProm=suma/this.procesos.length;
    this.GenerarColumnas();
  },
  
  
}
</script>
