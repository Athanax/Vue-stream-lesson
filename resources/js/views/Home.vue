<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <div class="message" v-for='status in statuses'>
                    <div class="message-header">
                        <p>{{ status.user.name }} said ...</p>
                        <p>
                            <!-- this is a filter added at this point to custom the contents of this variable -->
                            <!-- they are declared in the filters method in the script tag -->
                            <!-- the filter is called after the | symbol in the blade template. i.e. pipe suntax -->
                           <!-- {{ postedOn(status) | ago }} -->
                           {{ status.created_at | ago | capitalise }}
                        </p>
                    </div>

                    <div class="message-body">
                        {{ status.body }}
                    </div>
                </div>
                <!-- this is the child of this component -->
                <!-- we have emitted an event from the child to inform the parent that it has completed submitting -->
                <!-- we cn now capture the event at this point -->
                <!-- the completed event will trigger the method addToStatusses which will update the statuses variable -->
                <addStatus @completed='addToStatuses'></addStatus>
            </div>
        </div>

        <corousel autoplay="false">
            <img src="http://placeimg.com/640/480/any">
            <img src="http://placeimg.com/640/480/any?1">
            <img src="http://placeimg.com/640/480/any?2">
            <img src="http://placeimg.com/640/480/any?3">
            <img src="http://placeimg.com/640/480/any?4">
        </corousel>
    </div>
</template>

<script>
    import moment from 'moment';
    import addStatus from '../components/AddStatus';
    import corousel from './Corousel'

    export default {
        mounted() {
            console.log('Component mounted.')
        },

        components:{
            addStatus,
            corousel
        },

        data(){
            return{
            statuses: []

            }
        },
        filters:{
            // this part replaces the methods projectrs function
            ago(date){
                 return moment(date).fromNow();
            },
            // i can also add capitalise to male the date uppercase

            // it is not a must that i should use the date parameter in here, it is only bound and meaningful to this capitalise function
            capitalise(date){
                return date.toUpperCase();
            }
        },
        // the created method runs immediately the page loads
        created(){
            Axios.get('/statuses')
            .then(response=> this.statuses = response.data)
            
        },

        methods:{
            // thim part is what is used before i used the filters
            // postedOn(status){
            //     return moment(status.created_at).fromNow();
            // }

            addToStatuses(status){
                
                this.statuses.unshift(status);

                // alert('data has been added to stream');

                // scroll to top when new data is loaded
                window.scrollTo(0,0);
            }
        }
        

    }
</script>
