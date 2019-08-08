import './bootstrap';

import router from './router';

// import corousel from './views/Corousel'

window.onload = function(){
    new Vue({
        el: '#root',
    
        router,

        components:{
            
        }
        
    });
}



