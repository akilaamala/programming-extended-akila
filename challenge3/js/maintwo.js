function ajax(obj){
    var xhr = new XMLHttpRequest();
    var params = obj.data ? JSON.stringify(obj.data) : '';
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (obj.onSuccess) {
                obj.onSuccess(xhr.response);
            } else {
                console.log('success');
            }
        } else {
            if (obj.onFail) {
                obj.onFail(xhr.response);
            } else {
                console.log('failed');
            }
        }
        if (obj.onFinish){
            obj.onFinish(xhr.response);
        } else {
            console.log('finished');
        }
    };
    xhr.open(obj.method ? obj.method : 'GET', obj.url + '?' + params, true);
    xhr.send(params)
}


