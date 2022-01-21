
const App = {
	data(){
		return{
			apiUrl:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
			apiPath: 'rainliao', // 請加入個人 API Path			
			products: [], // 擺放遠端的資料用
			temporaryObj: {}, //當下選取的物件資料用
		}
	},	
	methods: {
		getProducts(){
			axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
			.then((res)=>{
				this.products = [ ...res.data.products];//讀取遠端data裡的products,並且淺拷貝,放入空陣列products
			})
			.catch((error)=>{
				//錯誤訊息
				console.log(error.data.message);
				alert(error.data.message);
			});
		},
		checkLogin(){
			axios.post(`${this.apiUrl}/api/user/check`)
			.then((res)=>{
				//有登入的話，就顯示renderData的資料
				this.getProducts();
			})
			.catch((error)=>{
				//未登入或是嘗試直接進入此頁面會被導入login頁
				console.log(error.data.message);
				alert(error.data.message);
				location.href="login.html";
			})
		},			
		putItemsDetail(item){
			//點擊時將物件item資訊拷貝放入到temporaryObj
			this.temporaryObj = { ...item }
		}		
	},
	mounted(){
		// token 寫入至 headers 從login頁面來的cookie能夠持續使用此token // hexToken 必須跟 login頁面一樣設定為hexToken
		const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
		// 當下次載入頁面時，自動放入token
		axios.defaults.headers.common['Authorization'] = token;
		// 執行登入確認
		this.checkLogin();
	}		
}

Vue.createApp(App).mount('#app');