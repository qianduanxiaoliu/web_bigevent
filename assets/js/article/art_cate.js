$(function () {
	const layer = layui.layer;
	const form = layui.form;
	//获取表格数据
	const initArtCateList = () => {
		$.ajax({
			type: 'GET',
			url: '/my/article/cates',
			success: (res) => {
				// console.log(res);
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

	//修改弹窗
	let indexEdit = null;
	$('body').on('click', '.btn-edit', function () {
		indexEdit = layer.open({
			type: 1,
			area: ['500px', '250px'],
			title: '修改文章分类',
			content: $('#dialog-edit').html()
		});
		$.ajax({
			type: 'GET',
			url: '/my/article/cates/' + $(this).attr('data-id'),
			success: (res) => {
				form.val('form-edit', res.data);
			}
		});
	});

	//更新文章分类
	$('body').on('submit', '#form-edit', function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/my/article/updatecate',
			data: $(this).serialize(),
			success: (res) => {
				if (res.status !== 0) return layer.msg('更新文章分类失败！');
				layer.msg('更新文章分类成功！');
				layer.close(indexEdit);
				initArtCateList();
			}
		});
	});

	//删除文章
	$('body').on('click', '#btn-delete', function (e) {
		const id = $(this).attr('data-id');
		layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function (index) {
			$.ajax({
				type: 'GET',
				url: '/my/article/deletecate/' + id,
				success: (res) => {
					if (res.status !== 0) return layer.msg('删除分类失败');
					layer.msg('删除分类成功');
					layer.close(index);
					initArtCateList();
				}
			});
		});
	});
});
