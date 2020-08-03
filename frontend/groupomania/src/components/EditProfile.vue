<template>

    <div>
        <div class="container">
            <div class="avatar-container">
                <avatar-preview :file="file" @getFile="file = $event"/>
            </div>

            <p>{{ userId }}</p>
            <p>{{  file.name }}</p>
        </div>
    </div>

</template>

<script>
    import { getToken } from '../../helpers/decode';
    import AvatarPreview from './AvatarPreview'

    export default {
        name: 'EditProfile',
        data: () => ({
            userId: '',
            file: '',
        }),
        created() {
            const user = getToken();
            this.userId = user.id;
        },
        methods: {
            
        }, 
        components: {
            'avatar-preview': AvatarPreview
        }
    }

</script>

<style scoped lang="scss">

    .container {
        margin-top: 40px;
        padding: 0 30px;
        text-align: center;
    }

    .avatar-container {
        margin: 0 auto;
        width: 150px;        
    }

</style>

