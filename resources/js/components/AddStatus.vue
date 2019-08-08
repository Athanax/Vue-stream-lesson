<template>
    <div class="message">
        <div class="message-header">
            Push to status
        </div>
        <div class="message-body">

            <form action="" @submit.prevent="onSubmit">
                <p class="control">
                    <textarea v-model="form.body" class="textarea" name="" id="" cols="30" rows="10"></textarea>
                    <span class="help is-danger" v-if="form.errors.has('body')" v-text="form.errors.get('body')"></span>
                </p>
                <p class="control">
                    <button class="button is-primary" :disabled='form.errors.any()'>
                        Submit
                    </button>
                </p>
            </form>
            
        </div>
    </div>
</template>

<script>
import Form from '../core/Form'
export default {
    data(){
        return {
            form: new Form({
                body: '',
            })
        }
    },
    methods:{
        onSubmit(){
            // 
            this.form.post('/statuses')
            // here, we are emitting an event to the parent component (Home.vue) to tell it that the data has been submitted and also 
            // new nata has been requested
            .then(status => this.$emit('completed', status));
        }
    }
}
</script>

