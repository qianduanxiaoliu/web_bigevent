$(function () {
	const form = layui.form;
	const layer = layui.layer;

	//自定义呢称校验规则
	form.verify({
		nixkname: (val) => {
			if (val.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
		}
	});

	//获取用户基本资料
	const initUserinit = () => {
		$.ajax({
			type: 'GET',
			url: '/my/userinfo',
			success: (res) => {
				console.log(res);
				if (res.status !== 0) return layer.msg('获取用户信息失败');
				layer.msg('获取用户信息成功');
				// 快速给表单赋值
				form.val('formUserInfo', res.data);
			}
		});
	};
	initUserinit();

	//实现点击重置
	$('#btnReset').click((e) => {
		e.preventDefault();
		initUserinit();
	});

	//更新用户信息
	$('.layui-form').on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/my/userinfo',
			data: $(this).serialize(),
			success: (res) => {
				if (res.status !== 0) return layer.msg('更改用户信息失败');
				layer.msg('更改用户信息成功');
				//调用 index.js 中的 getUserInfo 函数渲染头像
				window.parent.getUserInfo();
			}
		});
	});
});
