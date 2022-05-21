$(function () {
	const layer = layui.layer;
	// 1.1 获取裁剪区域的 DOM 元素
	var $image = $('#image');
	// 1.2 配置选项
	const options = {
		// 纵横比
		aspectRatio: 1,
		// 指定预览区域
		preview: '.img-preview'
	};

	// 1.3 创建裁剪区域
	$image.cropper(options);

	//模拟文件选择框 点击事件
	$('#btnChooseImage').click(function (e) {
		$('#file').click();
	});

	//设置图片
	$('#file').change(function (e) {
		//获取用户上传的文件
		const file = e.target.files[0];
		//获取文件路径
		const imgURL = URL.createObjectURL(file);
		// console.log(imgURL);
		// 3. 重新初始化裁剪区域
		$image
			.cropper('destroy') // 销毁旧的裁剪区域
			.attr('src', imgURL) // 重新设置图片路径
			.cropper(options); // 重新初始化裁剪区域
	});

	//确认按钮设置图片
	$('#btnUpload').click((e) => {
		// 1、拿到用户裁切之后的头像
		// 直接复制代码即可
		const dataURL = $image
			.cropper('getCroppedCanvas', {
				// 创建一个 Canvas 画布
				width: 100,
				height: 100
			})
			.toDataURL('image/png');
		// 2、发送 ajax 请求，发送到服务器
		$.ajax({
			type: 'POST',
			url: '/my/update/avatar',
			data: {
				avatar: dataURL
			},
			success: (res) => {
				console.log(res);
				if (res.status !== 0) return layer.msg('修改图片失败');
				layer.msg('修改图片成功');
				// $('#img').attr('src', dataURL);

				// console.log($('#image'));

				window.parent.getUserInfo();
			}
		});
	});
});
