$(function () {
	const layer = layui.layer;
	//获取表格数据
	const initArtCateList = () => {
		$.ajax({
			type: 'GET',
			url: '/my/article/cates',
			success: (res) => {
				if (res.status !== 0) return layer.msg('获取文章分类失败');
				layer.msg('获取文章分类成功');
				const htmlSrc = template('tpl-table', res);
				$('tbody').html(htmlSrc);
			}
		});
	};

	initArtCateList();

	let indexAdd = null;

	//弹出层
	$('#btnAddCate').click(() => {
		indexAdd = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '添加文章分类',
			content: $('#dialog-add').html()
		});
	});

	// 通过代理监听 submit 事件
	$('body').on('submit', '#form-add', function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/my/article/addcates',
			data: $(this).serialize(),
			success: (res) => {
				if (res.status !== 0) return layer.msg('新增分类失败');
				layer.msg('新增分类成功');
				initArtCateList();
				layer.close(indexAdd);
			}
		});
	});
});
