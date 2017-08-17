$(function() {
    // 监听上传变化
    $('#fileTest').off().on('change', function(ev) {
        let $file = $(this);
        let fileObj = $file[0];
        let windowURL = window.URL || window.webkitURL;
        let dataURL = null;
        if (!fileObj || !fileObj.files || !fileObj.files[0])
            return;
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $("#imgTest").attr('src', dataURL);
        $("#imgTest").cropper({
            aspectRatio: 1 / 1,
            viewMode: 1,
            rotatable: true,
            guides: false, //裁剪框虚线 默认true有
            dragMode: "move",
            background: true, // 容器是否显示网格背景
            movable: true, //是否能移动图片
            cropBoxMovable: false, //是否允许拖动裁剪框
            cropBoxResizable: false, //是否允许拖动 改变裁剪框大小
            modal: false,
            preview: ".extra-preview",
            done: function(data) {
                console.log(data);
            }
        });
        $("#imgTest").cropper('replace', dataURL);
    });

    // 点击弹出
    $('.self_logo_up').off().on('click', function() {
        $('.img_pop_up').css('display', 'block');
    })

    // 向左旋转
    $('.rotate_left').off().on('click', function() {
        $("#imgTest").cropper('rotate', -45);
    })

    // 向右旋转
    $('.rotate_right').off().on('click', function() {
        $("#imgTest").cropper('rotate', 45);
    })

    // 取消上传图片事件
    $('.cancel_choose').off().on('click', function() {
        $('.img_pop_up').css('display', 'none');
        clear();
    })

    // 点击确定
    $('.confirm_button .confirm_choose').off().on('click', function() {
        if ($("#imgTest").cropper('getCroppedCanvas') == null)
            return;
        let base64 = $("#imgTest").cropper('getCroppedCanvas').toDataURL('base64', 0.3);
        $('.self_bg').remove();
        const logoImg = `<div class="self_bg" style="display:block;">
        ![](${base64})
    </div>`
        $('.self_logo_up').append(logoImg);

        // 清空
        $("#imgTest").cropper('reset');
        $('.img_pop_up').css('display', 'none');
        clear();
    });

});
