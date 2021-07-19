<template>
  <v-app>
    <div>
      <v-app-bar dark accent-4 flat color="blue">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title color="white">TP Sistemas Operativos</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="this.IrInicio">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn icon @click="ayuda=true">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" fixed  temporary width="300">
        <v-system-bar></v-system-bar>
        <v-list nav two-line>
          <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">

            <v-list-item link @click="this.IrInicio">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Inicio</v-list-item-title>
                <v-list-item-subtitle>Home</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          
            <v-list-item link @click="this.IrFIFO">
              <v-list-item-icon>
              <v-icon>mdi-xml </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>FCFS</v-list-item-title>
                <v-list-item-subtitle>First-Come First-Served</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-list-item link @click="this.IrSJF">
              <v-list-item-icon>
                <v-icon>mdi-vuejs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>SJF</v-list-item-title>
                <v-list-item-subtitle>Shortest Job First</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-list-item link @click="this.IrSRTF">
              <v-list-item-icon>
                <v-icon>mdi-language-javascript</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>SRTF</v-list-item-title>
                <v-list-item-subtitle>Shortest-Remaining-Time-First</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-list-item link @click="this.IrRR">
              <v-list-item-icon>
                <v-icon>mdi-language-html5</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Round Robin</v-list-item-title>
                <v-list-item-subtitle>Planificación por turnos</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-list-item link @click="this.IrPrioridadNA">
              <v-list-item-icon>
                <v-icon>mdi-file-code-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Planif. por Prioridades</v-list-item-title>
                <v-list-item-subtitle>No apropiativa</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          
            <v-list-item link @click="this.IrPrioridadA">
              <v-list-item-icon>
                <v-icon>mdi-code-tags</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Planif. por Prioridades</v-list-item-title>
                <v-list-item-subtitle>Apropiativa</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item @click="acerca=true">
              <v-list-item-icon>
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Acerca del proyecto</v-list-item-title>
                <v-list-item-subtitle>+Info</v-list-item-subtitle>
              </v-list-item-content>  
            </v-list-item>
            
          </v-list-item-group>  
        </v-list>
      </v-navigation-drawer>

    </div>
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer padless  color="primary ">
    <v-col
      class="text-center"
      cols="12"
    >
        <strong>Sistemas Operativos 2021 - Passi Juan Pablo</strong>
    </v-col>
  </v-footer>

  <!--Dialog ayuda -->
   <v-dialog  v-model="ayuda"  width="500">
     <v-card>
        <v-card-title class="text-h5 grey lighten-2">Modo de Uso</v-card-title>

        <v-card-text class="mt-5">
          <b>1- </b>Seleccione un algoritmo de planificación de la lista y presione "Aceptar". O seleccione una de las opciones de la barra lateral. <br><br>
          <b>2- </b>Ingrese los procesos intervinientes con sus respectivos datos. Presione el botón "+" para agregar un proceso a la lista.
           Para cada proceso deberá ingresar nombre, tiempo de llegada y tiempo de ejecución o ráfaga de CPU. En el caso de tratarse de algoritmos de prioridades, 
           se deberá ingresar también el número de prioridad para cada uno. Y en el caso de tratarse del algoritmo de Round Robin, se pedirá ingresar el número de quantum.
           Se pueden modificar los valores de cada celda presionando sobre esta y escribiendo el nuevo valor. También se pueden eliminar las filas correspondiente a cada proceso
           presionando sobre el icono de la columna "Borrar".
           Una vez concluida la carga de procesos y sus datos, presione "Generar". <br><br>
           <b>3- </b> A continuación se mostrará una tabla con los procesos y los valores de tiempo de espera, tiempo de servicio e índice de servicio. Al final de la columna de 
           tiempo de espera se mostrará el tiempo de espera promedio entre los procesos.
           Debajo de esta tabla se mostrará el diagrama de Gantt con la secuencia de ejecución de los procesos de acuerdo con el algoritmo elegido.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="ayuda = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog ayuda -->

    <!--Dialog acerca -->
    <v-dialog  v-model="acerca"  width="500">
     <v-card>
        <v-card-title class="text-h5 grey lighten-2">Acerca del proyecto</v-card-title>

        <v-card-text class="mt-5">
          <p>Este proyecto fue realizado por el alumno <b>Passi Juan Pablo</b> de la carrera de Ingeniería en Informática para la materia <b>Sistemas Operativos</b>
            durante el periodo lectivo 2021. <br><br>
            El tema elegido fue la planificación de procesos, donde se codificaron los distintos algoritmos de planificación vistos en clases. A partir de datos de entrada 
            (datos de los procesos) se obtienen las secuencias de ejecución y los valores propios de cada algoritmo (tiempo de espera, tiempo de servicio, índice de servicio ). <br><br>
            Este proyecto se desarrolló con tecnologías web (HTML, CSS, JavaScript) utilizando Vue.js (framework de javascript) para construir la interfaz de usuario y la 
            aplicación de una sola página.
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="acerca = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog acerca -->
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data(){
    return{
      drawer: false,
      group: null,
      ayuda: false,
      acerca: false,
    }
  },
  methods:{
    IrInicio(){
      this.$router.push({name: 'Inicio'});
    },
     IrFIFO(){
      this.$router.push({name: 'Procesos', params: {id:'0' }});
    },
     IrSJF(){
      this.$router.push({name: 'Procesos', params: {id:'1' }});
    },
     IrSRTF(){
      this.$router.push({name: 'Procesos', params: {id:'2' }});
    },
     IrRR(){
      this.$router.push({name: 'Procesos', params: {id:'3' }});
    },
     IrPrioridadNA(){
      this.$router.push({name: 'Procesos', params: {id:'4' }});
    },
     IrPrioridadA(){
      this.$router.push({name: 'Procesos', params: {id:'5' }});
    },
    
  }
};
</script>
