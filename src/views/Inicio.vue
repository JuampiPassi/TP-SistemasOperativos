<template>
    <v-container>
      <h1 class="text-center"><b>Simulador de planificacion de procesos</b></h1>
      <v-row justify="center" class="mt-5">
        <v-alert color="indigo darken-1" prominent dismissible elevation="16" type="info" icon="mdi-arrow-bottom-right-thick" max-width="1000" class="mt-5 text-center"  outlined border="left">
          <p>En la lista de abajo se presentan una serie de algoritmos para planificación de procesos. Cada uno de estos algoritmos representan diferentes 
          maneras de decidir que proceso de la cola de listos debe asignarsele a la CPU</p>
        </v-alert>
      </v-row>

    <v-card  elevation="3" rounded max-width="500"  class="mx-auto my-12" id="elegirAlgoritmo">
      <v-toolbar flat color="indigo darken-1" dark>
        <v-spacer>
          <v-toolbar-title>Seleccione un algoritmo de planificacion</v-toolbar-title>
        </v-spacer>
      </v-toolbar>
      <v-divider></v-divider>

      <v-list subheader two-line>
        <v-list-item-group  v-model="algoritmo" color="primary" active-class="indigo--text">

          <v-list-item :key="1">
            <v-list-item-content>
              <v-list-item-title>FCFS</v-list-item-title>
              <v-list-item-subtitle>First-Come First-Served</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="fifo = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-list-item :key="2">
            <v-list-item-content>
              <v-list-item-title>SJF</v-list-item-title>
              <v-list-item-subtitle>Shortest Job First</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="sjf = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-list-item :key="3">
            <v-list-item-content>
              <v-list-item-title>SRTF</v-list-item-title>
              <v-list-item-subtitle>Shortest-Remaining-Time-First</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="srtf = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-list-item :key="4">
            <v-list-item-content>
              <v-list-item-title>Round Robin </v-list-item-title>
              <v-list-item-subtitle>Planificación por turnos</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="rr = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-list-item :key="5">
            <v-list-item-content>
              <v-list-item-title>Planificación por Prioridades</v-list-item-title>
              <v-list-item-subtitle>No Apropiativa</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="priorNa = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

         <v-list-item :key="6">
            <v-list-item-content>
              <v-list-item-title>Planificación por Prioridades</v-list-item-title>
              <v-list-item-subtitle>Apropiativa</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
             <v-btn icon @click="priorAprop = true">
                <v-icon color="primary">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
        </v-list-item>

        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="indigo darken-1" outlined elevation="5"  @click="Aceptar" text>Aceptar</v-btn>
    </v-card-actions>
    </v-card>

    <!--Dialog FIFO -->
    <v-dialog  v-model="fifo"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>FIFO o FCFS</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
          <p>La planificación FIFO (first in, first out) o FCFS (First-come first-served) es el algoritmo más simple, se asigna 
            a la CPU de acuerdo al orden de llegada (primero en llegar, primero en ser servido). <br>
            Una vez que la CPU ha sido asignada a un proceso, dicho proceso conserva la CPU hasta que termina su ejecición o este 
             realiza una operación de entrada/salida. <br><br>
             <b>Características: </b> <br>
             <b>- </b>El tiempo medio de espera con el algoritmo FCFS es a menudo bastante largo.
             <b>- </b>Al alternarse con este algoritmo procesos intensivos en CPU con procesos intensivos en entrada/salida, puede 
             producirse el llamado "efecto convoy". </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="fifo = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog FIFO -->
    <!--Dialog SJF -->
    <v-dialog  v-model="sjf"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>SJF</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
          <p>El algoritmo SJF (shortest job first) asocia a cada proceso el largo de su próximo CPU-burst,
             asignando al CPU (cuando queda disponible), el proceso que tenga menor CPU-burst. Si las ráfagas son iguales, 
             se usa el orden de llegada. <br>
             Aunque aparezca un proceso con menor CPU-burst en la lista, se espera a que el proceso que tiene la CPU termine de ejecutarse. <br>
             Para poder llevar a cabo este algoritmo es necesario conocer los tiempos de ejecución que por lo general son desconocidos. <br><br>
             <b>Características: </b> <br>
             <b>- </b> El algoritmo SJF es optimo: proporciona un tiempo medio de espera mínimo para un conjunto de procesos. 
             Anteponer un proceso corto a uno largo, genera que disminuya el tiempo medio de espera. <br>
             <b>- </b>Este algoritmo se puede utilizar como mecanismo de planificación a largo plazo, pero no en corto plazo 
             debido que no se puede conocer la duración de la siguiente ráfaga de CPU si bien se puede llegar a aproximar 
             basado en que la ráfaga de CPU será similar a las anteriores.
             </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="sjf = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog SJF -->
    <!--Dialog SRTF -->
    <v-dialog  v-model="srtf"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>SRTF</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
         <p>El algoritmo RSTF (Shortest-Remaining-Time-First) es una variante apropiativa del SJF. 
           Si aparece en la lista un proceso cuyo CPU-Burst es menor del que se está ejecutando, lo quita de la CPU y carga aquel que tenía menor CPU-Burst</p> 
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="srtf = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog SRTF -->
     <!--Dialog RR -->
    <v-dialog  v-model="rr"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>Round Robin</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
          <p>El algoritmo Round Robin es similar a la planificación FCFS, pero se añade la técnica de desalojo para conmutar entre procesos. 
            Designa un intervalo de tiempo para el uso del procesador, por cada proceso (time quantum). 
            Generalmente, el quantum se encuentra en el rango comprendido entre 10 y 100 milisegundos. <br>
            Cuando se le asigna la CPU a un proceso, este ejecutará hasta finalizar (la ráfaga es menor que el quantum de tiempo),
            o hasta que se le consuma el quantum. Cuando sucede alguna de las situaciones mencionadas, se envía una interrupción al procesador, 
            se ejecuta un cambio de contexto (es menor que 10 microsegundos) y se asigna otro proceso a la CPU (en caso que el otro proceso no 
            haya finalizado de ejecutar, volverá a la lista de procesos listos). <br><br>
            <b>Características: </b> <br>
            <b>- </b> Por lo general tiene mayor tiempo de retorno que el SJF, pero mejora el tiempo de respuesta. <br>
            <b>- </b> La cola de procesos listos se trata como una cola circular. <br>
            <b>- </b> Es fácil de implementar. Es el algoritmo más justo: todos los procesos tienen garantizada su porción de CPU. <br>
            <b>- </b> Si el quantum es muy pequeño, por ejemplo de 1ms se denomina compartición del procesador, pero hay muchos cambios de contexto 
            (el cual lleva tiempo) y afecta el rendimiento. Si es muy grande, el sistema tenderá a ser FCFS.
            </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="rr = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog RR -->
     <!--Dialog prioridades Na-->
    <v-dialog  v-model="priorNa"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>Prioridades No apropiativa</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
          <p>En este algoritmo a cada proceso se le asigna un numero de prioridad. 
            Mientras menor sea este entero, mayor prioridad tiene el proceso, por lo que el objetivo del algoritmo es planificar la entrada 
            de procesos a la CPU de acuerdo a la prioridad asociada de cada uno de ellos. <br>
            <b> En este caso el algoritmo es no apropiativo, es decir que aunque aparezca un proceso con mayor prioridad en la lista, se espera 
            a que el proceso que tiene la CPU termine de ejecutarse.</b> <br>
            Las prioridades pueden definirse internamente (por ej. limite de tiempo, requisitos de memoria, archivos abiertos, etc) o 
            externamente al SO (por ej. Importancia del proceso, costo, etc). <br> <br>
            <b>Características: </b> <br>
            <b>- </b> El problema con los algoritmos de planificación por prioridades es el bloqueo indefinido o la muerte por inanición 
            ya que los procesos con baja prioridad no se ejecutarían (o se ejecutaría en un tiempo muy largo) si están llegando procesos con prioridad mayor. 
            </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="priorNa = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog prioridades NA-->
      <!--Dialog prioridades aprop-->
    <v-dialog  v-model="priorAprop"  width="500">
     <v-card>
        <v-toolbar color="primary" dark><v-toolbar-title>Prioridades apropiativa</v-toolbar-title></v-toolbar>
        <v-card-text class="mt-5">
          <p>En este algoritmo a cada proceso se le asigna un numero de prioridad. 
            Mientras menor sea este entero, mayor prioridad tiene el proceso, por lo que el objetivo del algoritmo es planificar la entrada 
            de procesos a la CPU de acuerdo a la prioridad asociada de cada uno de ellos. <br>
            <b> En este caso el algoritmo es apropiativo, es decir que si aparece en la lista un proceso cuya proridad es mayor del que se está ejecutando, 
            lo quita de la CPU y carga aquel que tenía mayor prioridad.</b> <br>
            Las prioridades pueden definirse internamente (por ej. limite de tiempo, requisitos de memoria, archivos abiertos, etc) o 
            externamente al SO (por ej. Importancia del proceso, costo, etc). <br> <br>
            <b>Características: </b> <br>
            <b>- </b> El problema con los algoritmos de planificación por prioridades es el bloqueo indefinido o la muerte por inanición 
            ya que los procesos con baja prioridad no se ejecutarían (o se ejecutaría en un tiempo muy largo) si están llegando procesos con prioridad mayor. 
            </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="priorAprop = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Dialog prioridades aprop-->

    </v-container>
</template>
<script>
export default {
    name:'Inicio',
    data(){
		return{
            algoritmo: '',
            fifo: false,
            sjf: false,
            srtf: false,
            rr: false,
            priorNa: false,
            priorAprop: false,
            
        }
    },
    methods:{
        Aceptar(){
        
            switch (this.algoritmo) {
                case 0:
                    this.$router.push({ name: 'Procesos',params:{id:'0'}})
                    break;
                case 1:
                    this.$router.push({ name: 'Procesos',params:{id:'1'}})
                    break;
                case 2:
                    this.$router.push({ name: 'Procesos',params:{id:'2'}})
                    break; 
                case 3:
                    this.$router.push({ name: 'Procesos',params:{id:'3'}})
                    break; 
                case 4:
                    this.$router.push({ name: 'Procesos',params:{id:'4'}})
                    break; 
                case 5:
                    this.$router.push({ name: 'Procesos',params:{id:'5'}})
                    break;    
            
            }
        },
    }
}
</script>
