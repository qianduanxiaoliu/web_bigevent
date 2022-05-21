$(function () {
	getUserInfo();

	//点击退出请求
	$('#btnLogout').click(() => {
		layer.confirm('确认是否退出', { icon: 3, title: '提示' }, function () {
			//do something
			localStorage.removeItem('token');
			location.href = '/login.html';
		});
	});
});

//获取用户信息
function getUserInfo() {
	$.ajax({
		type: 'GET',
		url: '/my/userinfo',
		// headers: {
		// 	Authorization: localStorage.getItem('token')
		// },
		success: function (res) {
			console.log(res);
			if (res.status !== 0) return layui.layer.msg('请求数据失败');
			layui.layer.msg('请求数据成功');
			//调用渲染头像函数
			randerAvatar(res.data);
		}

		//不论成功还是失败，最终都会调用 complete 回调函数
		// complete: (res) => {
		// 	console.log(res);
		// 	if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
		// 		localStorage.removeItem('token');
		// 		location.href = '/login.html';
		// 	}
		// }
	});
}

//渲染用户名和头像
const randerAvatar = (user) => {
	//获取名字
	const name = user.nickname || user.username;
	//设置欢迎文本
	$('#welcome').html(`欢迎 ${name}`);

	//设置头像
	if (user.user_pic !== null) {
		$('.layui-nav-img').attr('src', user.user_pic).show();
		$('.text-avatar').hide();
	} else {
		$('.layui-nav-img').hide();
		const firstName = name[0].toUpperCase();
		$('.text-avatar').html(firstName).show();
	}
};
