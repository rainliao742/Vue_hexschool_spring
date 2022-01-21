const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rainliao'; // 請加入個人 API Path

const App = {
	data(){
		return{
			user:{
				username:"",
				password:""
			}
		}
	},
	methods:{
		login(){
			axios.post(`${url}/admin/signin`, this.user).then((response)=>{

				const { token, expired } = response.data // 取出cookie token, 登入到期時間
				document.cookie = `hexToken=${ token }; expires=${ new Date(expired)};`;
				location.href = 'products.html';
				alert(response.data.message);

			}).catch((error)=>{
				console.dir(error);
				alert(error.data.message);
			})//登入失敗
		}
	}
}

Vue.createApp(App).mount('#app');