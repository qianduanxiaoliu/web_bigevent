$(function () {
	//点击事件 切换登录注册框
	$('#link_reg').click(() => {
		$('.reg-box').show();
		$('.login-box').hide();
	});

	$('#link_login').click(() => {
		$('.reg-box').hide();
		$('.login-box').show();
	});

	// 获取form
	let form = layui.form;

	// 定义表单验证规则
	form.verify({
		//密码验证
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

		//确认密码验证
		repwd: function (val) {
			const pwd = $('.reg-box [name=password]').val();
			if (val !== pwd) return '两次密码不一致';
		}
	});

	//根路径
	// const baseUrl = 'http://www.liulongbin.top:3007';

	// 监听注册表单提交  发送注册请求
	$('#form_reg').on('submit', (e) => {
		//阻止form默认提交事件
		e.preventDefault();

		//发送ajax请求
		$.ajax({
			type: 'POST',
			url: '/api/reguser',
			data: {
				username: $('#form_reg [name=username]').val(),
				password: $('#form_reg [name=password]').val()
			},
			success: (res) => {
				if (res.status !== 0) return layui.layer.msg('注册失败');
				layui.layer.msg('注册成功');
				$('#link_login').click();
			}
		});
	});

	// 监听登录表单提交  发送注册请求
	$('#form_login').on('submit', function (e) {
		//阻止默认提交事件
		e.preventDefault();
		//发送ajax请求
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: $(this).serialize(),
			success: (res) => {
				if (res.status !== 0) return layui.layer.msg('登录失败');
				layui.layer.msg('登录成功');
				localStorage.setItem('token', res.token);
				location.href = '/index.html';
			}
		});
	});
});
