<template>
    <v-container>
        <h2 class="text-center"><b>{{this.algoritmo}}</b></h2>
        <div class="grilla">
        <DxDataGrid
            id="grid"
            :show-borders="true"
            :data-source="procesos"
            :repaint-changes-only="true"
            :columnAutoWidth="true"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            :show-column-lines="true"
            :row-alternation-enabled="true"
            :width="500"
        >

            <DxEditing
                refresh-mode="reshape"
                :allow-adding="true"
                :allow-updating="true"
                :allow-deleting="true"
                :use-icons="true"
                :confirm-delete="false"
                mode="cell"
            />
            <DxColumn
                data-field="proceso"
                caption="Proceso"
            ></DxColumn>
            <DxColumn
                data-field="cpu"
                caption="CPU"
                data-type="number"
            ></DxColumn>
            <DxColumn
                data-field="llegada"
                caption="Llegada"
                data-type="number"
            ></DxColumn>
            <template v-if="this.algoritmo=='Prioridades No Apropiativo' || this.algoritmo=='Prioridades Apropiativo'">
                <DxColumn
                    data-field="prioridad"
                    caption="Prioridad"
                    data-type="number"
                ></DxColumn>
            </template>
            <DxColumn
            caption="Borrar"
                type="buttons"
                :width="100"
            >
                <DxButton name="delete"/>
            </DxColumn>

        </DxDataGrid>
        <template v-if="this.algoritmo=='Round Robin'">
            <v-row >
                <v-col cols="1" class="mx-auto mt-5">
                    <v-text-field  v-model="quantum" type="number" label="Quantum" required dense outlined></v-text-field>
                </v-col>
            </v-row>
        </template>
        <v-btn class="mt-5" text outlined color="primary" elevation="2" @click="generar">Generar</v-btn>
        </div>
    
        

    </v-container>
</template>
<script>
import { DxDataGrid,DxColumn, DxEditing, DxButton} from 'devextreme-vue/data-grid';
export default {
    name:'Procesos',
    components: {DxDataGrid,DxColumn, DxEditing, DxButton},
    data(){
		return{
            procesos:[
                {proceso: 'A', cpu: 2, llegada: 0},
                {proceso: 'B', cpu: 4, llegada: 0},
                {proceso: 'C', cpu: 5, llegada: 2},
                {proceso: 'D', cpu: 1, llegada: 1},
                {proceso: 'E', cpu: 8, llegada: 3}
            ],
            algoritmo: '',
            quantum: 1,

        }
    },
    methods:{
        atras(){
            this.$router.push({ name: 'Inicio'})
        },
        generar(){
            this.procesos.sort(function (a, b){return (a.llegada-b.llegada)})//Ordeno el vector de procesos por tiempo de llegada ascendente
            if (this.$route.params.id==='0'){//FIFO
                let acumulado=this.procesos[0].llegada;
                let temp=0;
                this.procesos.forEach(proceso => {
                    temp = acumulado + proceso.cpu;//tiempo de llegada + cpu (acumulado) para saber en que tiempo inicia el nuevo proceso
                    proceso.tfin=temp;//Tiempo en el que finaliza el proceso
                    proceso.tservicio = proceso.tfin - proceso.llegada;//Tiempo de servicio
                    proceso.tespera = proceso.tservicio - proceso.cpu;//Tiempo de espera
                    proceso.indice = (proceso.cpu / proceso.tservicio).toFixed(2);//Indice
                    acumulado = temp;
                });
                //console.log(this.procesos)
                localStorage.clear();
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                 this.$router.push({ name: 'Gantt',params:{id:'0'}})
            }
            if(this.$route.params.id==='1'){//SJF
                let acumulado=this.procesos[0].llegada;
                let temp=0;
                for (let index = 0; index < this.procesos.length; index++) {
                    let p=this.corto(acumulado);
                    temp=acumulado+this.procesos[p].cpu;
                    this.procesos[p].tfin=temp;//Tiempo en el que finaliza el proceso
                    this.procesos[p].tservicio=this.procesos[p].tfin-this.procesos[p].llegada;//Tiempo de servicio
                    this.procesos[p].tespera=this.procesos[p].tservicio-this.procesos[p].cpu;//Tiempo de espera
                    this.procesos[p].indice=(this.procesos[p].cpu/this.procesos[p].tservicio).toFixed(2);//Indice
                    this.procesos[p].procesado=1;//Indica que ya se procesó 
                    acumulado=temp;
                }
                localStorage.clear();
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                 this.$router.push({ name: 'Gantt',params:{id:'1'}})   
            }
            if(this.$route.params.id==='2'){//SRTF
                let cuenta=this.procesos[0].llegada;
                for (let i=0; i<this.procesos.length; i++){
                    cuenta=cuenta+this.procesos[i].cpu;//suma de cpu de todos los procesos
                    this.procesos[i].falta=this.procesos[i].cpu;//tiempo que le falta por procesar a cada proceso
                    this.procesos[i].salida=[];
                }
                for (let index=this.procesos[0].llegada; index<cuenta; index++) {
                    let p=this.corto2(index);//busco el proceso al que le resta menor tiempo de ejecición de los que tienen un tiempo de llegada menoro igual al actual
                    
                    for (let j=0; j<this.procesos.length; j++) {
                        if (j==p){
                        this.procesos[j].falta--; 
                        this.procesos[j].salida.push("1");
                        if ( this.procesos[j].falta==0){
                            this.procesos[j].procesado=1;
                            this.procesos[j].tfin=this.procesos[j].salida.length +this.procesos[j].llegada;
                            this.procesos[j].tservicio=this.procesos[j].tfin-this.procesos[j].llegada;
                            this.procesos[j].tespera=this.procesos[j].tservicio-this.procesos[j].cpu;
                            this.procesos[j].indice=(this.procesos[j].cpu/this.procesos[j].tservicio).toFixed(2);//Indice
                            }
                        }
                        else{
                            if((this.procesos[j].llegada<=index)&& (this.procesos[j].procesado!=1))
                                this.procesos[j].salida.push("0");
                        }
                    }
                }
                localStorage.clear();
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                this.$router.push({ name: 'Gantt',params:{id:'2'}})   

            }
            if(this.$route.params.id==='3'){//RR
                
                let acumulado=this.procesos[0].llegada;
                let c=acumulado; let t=acumulado; let aux=0;
	            let w=[];

                for (let i=0; i<this.procesos.length; i++){
                    this.procesos[i].salida=[];
                    c=c+this.procesos[i].cpu;//suma de las cpu
		            this.procesos[i].falta=this.procesos[i].cpu;
		            this.procesos[i].pos=i;
                }
                //console.log(c, this.procesos)
                
                for (let i=aux; i<this.procesos.length; i++){
                    if (this.procesos[i].llegada<=t){
			            w.push(this.procesos[i]);
			            aux++;
                    }else break;
                }
                
                
                while (t<c) {//t=tiempo actual, c=cpu total
                    for (let i=0; i<this.quantum; i++) {//Que cada proceso se ejecute quantum veces
                        if (w[0].falta>0){//si le falta por ejecutar 
                            w[0].falta--;
				            w[0].salida.push("1");
                            for (let i=aux; i<this.procesos.length; i++) {
                                if (this.procesos[i].llegada<=t){//Si encuentra otro proceso que haya llegado
						            w.push(this.procesos[i]);//lo agrego a la lista para ejecutarse
						            aux++;
                                }else break;
				            }
                            
                            for (let j=1; j<w.length; j++){
					            w[j].salida.push("0");//0=espera, le cargo un 0 a cada elemento segun la cantidad que tenga para recorrer
				            }
				            t++;   //aumento el tiempo 
                        }else break;
                    }
                    
                    
                    for (let i=aux; i<this.procesos.length; i++) {
                        if (this.procesos[i].llegada<=t){
				            w.push(this.procesos[i]);
				            aux++;
                        }else break;
                        
                    }
                    if (w[0].falta==0){
                        w[0].tfin=w[0].salida.length + w[0].llegada;
			            w[0].tservicio=w[0].tfin - w[0].llegada;
			            w[0].tespera=w[0].tservicio - w[0].cpu;
			            w[0].indice=(w[0].cpu/w[0].tservicio).toFixed(2);//Indice
			            this.procesos[w[0].pos]=w[0];
                        w.splice(w.begin,1);
                    }else{
                        w.push(w[0]);
			            w.splice(w.begin,1);
                    }
                }
                localStorage.clear();
                localStorage.setItem('quantum', this.quantum);
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                this.$router.push({ name: 'Gantt',params:{id:'3'}})   
                
            }
            if(this.$route.params.id==='4'){//Prioridad N.A.
               let acumulado=this.procesos[0].llegada;
               let p=0;
               
                for (let i = 0; i < this.procesos.length; i++) {
                    p=this.prioritario(acumulado);
                    this.procesos[p].procesado=1;
                    acumulado=acumulado+this.procesos[p].cpu;//tiempo de llegada + cpu (acumulado) para saber en que tiempo inicia el nuevo proceso
                    this.procesos[p].tfin=acumulado;//Tiempo en el que finaliza el proceso
                    this.procesos[p].tservicio=this.procesos[p].tfin-this.procesos[p].llegada;//Tiempo de servicio
                    this.procesos[p].tespera=this.procesos[p].tservicio-this.procesos[p].cpu;//Tiempo de espera
                    this.procesos[p].indice=(this.procesos[p].cpu/this.procesos[p].tservicio).toFixed(2)//Indice
                }
                localStorage.clear();
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                 this.$router.push({ name: 'Gantt',params:{id:'4'}}) 
            }
            if (this.$route.params.id==='5'){//Prioridades Apropiativo (si tienen la misma prioridad->FIFO)
                let acumulado=this.procesos[0].llegada;
                let p=0;
                for (let i = 0; i < this.procesos.length; i++) {
                    acumulado=acumulado+this.procesos[i].cpu;
                    this.procesos[i].falta=this.procesos[i].cpu;
                    this.procesos[i].salida=[];
                }
                for (let index=this.procesos[0].llegada; index<acumulado; index++) {
                    p=this.prioritario(index);
                    for (let j=0; j<this.procesos.length; j++) {
                        if(j==p){
                            this.procesos[j].falta--;
                            this.procesos[j].salida.push("1");
                            if(this.procesos[j].falta==0){
                                this.procesos[j].procesado=1;//Lo marco como procesado para que no se vuelva a elegir
                                this.procesos[j].tfin=this.procesos[j].salida.length + this.procesos[j].llegada;//Tiempo en el que finaliza el proceso
                                this.procesos[j].tservicio=this.procesos[j].tfin-this.procesos[j].llegada;//Tiempo de servicio
                                this.procesos[j].tespera=this.procesos[j].tservicio-this.procesos[j].cpu;//Tiempo de espera
                                this.procesos[j].indice=(this.procesos[j].cpu/this.procesos[j].tservicio).toFixed(2);//Indice
                            }
                        }else{
                            if((this.procesos[j].llegada<=index) && (this.procesos[j].procesado!=1))
                                 this.procesos[j].salida.push("0");
                        }
                        
                    }
                    
                }
                localStorage.clear();
                localStorage.setItem('procesos', JSON.stringify(this.procesos));
    
                 this.$router.push({ name: 'Gantt',params:{id:'5'}}) 

            }
        },
        corto(acumulado){//Devuelve el indice del proceso más corto de los que tienen tiempo de llegada menor o igual al acumulado
            let r=0;
            let cpu=10000;
            for (let index = 0; index < this.procesos.length; index++) {
                if((this.procesos[index].llegada<=acumulado) && (this.procesos[index].cpu<cpu) && (this.procesos[index].procesado!=1)){
                    r=index;
                    cpu=this.procesos[index].cpu;
                }
            }
            return r;
        },

        corto2(acumulado){//Devuelve el indice del proceso al que le resta menor tiempo de ejecición de los que tienen un tiempo de llegada menoro igual al acumulado
            let r=0;
            let cpu=10000; 
            for (let index = 0; index < this.procesos.length; index++) {
                if((this.procesos[index].llegada<=acumulado) && (this.procesos[index].falta<cpu)&& (this.procesos[index].procesado!=1)){
                   r=index;
                   cpu=this.procesos[index].falta;   
                }
            }
            return r;
        },
        prioritario(acumulado){
           let r=0;
           let p=4095;
            for (let index = 0; index < this.procesos.length; index++) {
                if((this.procesos[index].llegada<=acumulado) && (this.procesos[index].prioridad<p) && (this.procesos[index].procesado!=1)){
                    r=index;
			        p=this.procesos[index].prioridad;
                }
            }
            return r;
        },
        SetAlgoritmo(){
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
                this.algoritmo="Round Robin"
                break;   
            case '4':
                this.algoritmo="Prioridades No Apropiativo"
                break; 
            case '5':
                this.algoritmo="Prioridades Apropiativo"
                break; 
            }
        }
    },
    mounted(){
        this.SetAlgoritmo();
    },
    watch: {
        $route(){
            this.SetAlgoritmo();
        }
    }
}
</script>
<style scoped>
#grid{
    text-align-last: center;
    
}
.grilla{
text-align: -webkit-center;
}
.btn{
    float: left;
}

</style>