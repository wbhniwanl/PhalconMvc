//indexOf方法兼容
Array.prototype.indexOf = function (elt) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
    if (from < 0) from += len;
    for (; from < len; from++) {
        if (from in this && this[from] === elt)
            return from;
    }
    return -1;
}

// 数组去重
Array.prototype.unique = function () {
    this.sort();
    var re = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== re[re.length - 1]) {
            re.push(this[i]);
        }
    }
    return re;
}

// 添加指定元素
Array.prototype.add = function (val) {
    var index = this.indexOf(val);
    if (index < 0) {
        this.push(val);
    }
};

// 删除指定元素
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// 数组升序
Array.prototype.asc = function () {
    return this.sort(function (a, b) {
        return a - b;
    })
};

// 数组降序
Array.prototype.desc = function () {
    return this.sort(function (a, b) {
        return b - a;
    })
};



// 重写alert
window.alert = function (c) {
    var d = $.dialog(c, {
        title: '提示：'
    });
};

// 公用方法
(function ($) {

    /* Cookie操作方法
     * 获取：$.cookies.get('名')
     * 设置：$.cookies.set('名', '值')
     * 移除：$.cookies.remove('名')
     *
     */
    $.cookies = {

        //设置cookie   
        set: function (name, value, expires, path, domain, secure) {
            var cName = encodeURIComponent(name) + '=' + encodeURIComponent(value)
            if (typeof expires == 'number') {
                var date = new Date();
                date.setDate(date.getDate() + expires);
                cName += '; expires=' + date;
            }
            if (path) {
                cName += '; path=' + path;
            }
            if (domain) {
                cName += '; domain=' + domain;
            }
            if (secure) {
                cName += '; secure';
            }
            document.cookie = cName;
        },

        //获取cookie   
        get: function (name, param) {
            var cookie = document.cookie;
            var cValue = null;

            if (cookie.length > 0) {
                var cName = encodeURIComponent(name) + '=';
                var cStart = cookie.indexOf(cName);

                //截取cookie值   
                if (cStart > -1) {
                    var cEnd = cookie.indexOf(';', cStart);
                    if (cEnd == -1) {
                        cEnd = cookie.length;
                    }
                    cValue = decodeURIComponent(cookie.substring(cStart + cName.length, cEnd));
                }

                //截取cookie值内的参数   
                if (param) {
                    if (cValue) {
                        if (cValue.indexOf('&') > -1) {
                            var arr = cValue.split('&');
                            var pValue = '';
                            for (var i = 0; i < arr.length; i++) {
                                if (param == arr[i].split('=')[0]) {
                                    pValue = arr[i].split('=')[1];
                                }
                            }
                            cValue = decodeURIComponent(pValue);
                        }
                    }
                }

            }
            return cValue;
        },

        //移除cookie   
        remove: function (name) {
            $.cookies.set(name, '', -1);
        }

    };

    /* 截取url参数值 
     * 获取参数值：$.url.get('参数名')
     * 获取参数名：$.url.get('参数名', 'name')，name为常量
     *
     */
    $.url = {

        get: function (param, paramName, hash) {
            var url = hash == 'hash' ? location.hash : location.search;
            var str = hash == 'hash' ? '#' : '?';
            var obj = new Object();
            var value = '';
            var name = '';
            if (url.indexOf(str) != -1) {
                var str = url.substr(1);
                var strs = str.split('&');
                for (var i = 0; i < strs.length; i++) {
                    obj[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
                }
                for (var j in obj) {
                    if (j == param) {
                        value = obj[j] != 'undefined' ? obj[j] : '';
                        name = j;
                    }
                }
            }
            if (typeof paramName != 'undefined' && paramName == 'name') {
                return name;
            } else {
                return value;
            }
        },

        /* 
         * url 目标url 
         * key 需要替换的参数名称 
         * val 替换后的参数的值 
         * return url 参数替换后的url 
         */
        rep: function (url, key, val) {
            //var oUrl = url;
            //var re = eval('/(' + key + '=)/i');
            //var nUrl = oUrl.replace(re, paramName + '=' + replaceWith);
            //return url.replace(eval('/(' + key + ')/i'), key, val);
            return url.replace(/(username=)/i, '$1', 'aaa');
        }

    };

    /* 弹窗方法 
     * $.dialog('内容');
     *
     */
    $.dialog = function (content, obj) {
        var obj = obj ? obj : {};
        obj.skin = obj.skin ? obj.skin : 'f-dialog';
        obj.title = obj.title ? obj.title : '';
        obj.fixed = obj.fixed ? true : false;
        obj.content = content ? content : '';
        obj.onshow = function () {
            $('.ui-popup-backdrop').click(function () {
                d.close().remove();
            });
            if (typeof obj.onOpen == 'function') {
                obj.onOpen();
            }
        };
        var d = dialog(obj);
        d.showModal();
        d.reset();
        return d;
    };

    /* 增加天数 
     * $.addDay('天数');
     *
     */
    $.addDay = function (d, time) {
        function getNewDay(date, interval) {
            var baseDate = new Date(Date.parse(date.replace(/-/g, "/")));
            var baseYear = baseDate.getFullYear();
            var baseMonth = baseDate.getMonth();
            var baseDate = baseDate.getDate();
            var newDate = new Date(baseYear, baseMonth, baseDate);
            newDate.setDate(newDate.getDate() + interval);
            var temMonth = newDate.getMonth();
            temMonth++;
            var lastMonth = temMonth >= 10 ? temMonth : ("0" + temMonth)
            var temDate = newDate.getDate();
            var lastDate = temDate >= 10 ? temDate : ("0" + temDate);
            newDate = newDate.getFullYear() + "-" + lastMonth + "-" + lastDate;
            return newDate;
        };

        function addZero(n) {
            n = parseInt(Number(n));
            if (n < 10) n = 0 + '' + n;
            return n;
        };

        function startTime() {
            var date = new Date();
            return date.getFullYear() + '-' + addZero(date.getMonth() + 1) + '-' + addZero(date.getDate());
        };
        if (time) {
            return getNewDay(time, d);
        } else {
            return getNewDay(startTime(), d);
        }
    };

})(jQuery);

// 公用组件
(function ($) {

    $.fn.extend({

        // 获取粘贴内容值
        paste: function (fn) {
            return this.each(function () {
                var input = this;
                if ('onpropertychange' in input) {
                    input.onpropertychange = function () {
                        if (window.event.propertyName == 'value') {
                            if (fn) {
                                fn.call(this, window.event);
                            }
                        }
                    }
                } else {
                    input.addEventListener('input', fn, false);
                }
            });
        },

        // Tab选项卡
        Tab: function (options) {

            // 默认参数定义   
            var options = $.extend({
                callback: null
            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                var $tab = $(this);
                var $tabBtn = $tab.find('.tab-btn').find('li');
                var $tabMod = $tab.find('.tab-mod');

                // 点击切换
                $tab.on('click', '.tab-btn li', function () {
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        var index = $(this).index();
                        $tabBtn.removeClass('active');
                        $this.addClass('active');
                        $tabMod.removeClass('active');
                        $tabMod.eq(index).addClass('active');
                    }
                    if (typeof options.callback == 'function') {
                        options.callback();
                    }
                });

            });
        },

        // 文本框聚焦失焦
        Input: function (options) {

            // 默认参数定义   
            var options = $.extend({
                focus: null, //聚焦回调
                blur: null //失焦回调
            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                var input = $(this);
                input.on('focus', function () {
                    input.addClass('focus');
                    if (input.val() == this.defaultValue) {
                        input.val('');
                    }
                    if (typeof options.focus == 'function') {
                        options.focus(input);
                    }
                }).on('blur', function () {
                    if (input.val() == '') {
                        input.removeClass('focus').val(this.defaultValue);
                    }
                    if (typeof options.blur == 'function') {
                        options.blur(input);
                    }
                });

            });

        },

        // checkbox和radio选中
        checkInput: function (options) {

            // 默认参数定义   
            var options = $.extend({

            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                var icon = $(this);
                var input = icon.find('input');
                var name = input.attr('name');

                //选中
                input.on('change', function () {
                    if (input.attr('type') == 'radio') {
                        $("input[name='" + name + "']").parent('.icon-radio')
                                                       .removeClass('selected');
                    }
                    if (input.prop('checked')) {
                        icon.addClass('selected');
                    } else {
                        icon.removeClass('selected');
                    }
                });

                //悬停
                icon.on('mouseenter', function () {
                    icon.addClass('hover');
                }).on('mouseleave', function () {
                    icon.removeClass('hover');
                });

            });

        },

        // 复选框操作
        checkbox: function (options) {

            // 默认参数定义   
            var options = $.extend({
                callback: null,
                saveArr: [],
                saveAttr: '',
                saveCookies: ''
            }, options);

            return this.each(function () {

                var $list = $(this);
                var $checkbox = $list.find('.check-box').find('input[type=checkbox]');
                var $checkall = $list.find('.check-all');

                if (options.saveCookies && $.cookies.get(options.saveCookies)) {
                    options.saveArr = $.map($.cookies.get(options.saveCookies).split(','), function (val) {
                        return parseInt(val);
                    });
                }

                function check() {
                    if ($checkbox.filter(':checked').length == $checkbox.length) {
                        $checkall.prop('checked', true);
                    } else {
                        $checkall.prop('checked', false);
                    }
                    $checkbox.each(function () {
                        var $this = $(this);
                        var attr = $this.data(options.saveAttr) ? $this.data(options.saveAttr) : '';
                        if (attr) {
                            if ($this.prop('checked')) {
                                options.saveArr.add(attr);
                            } else {
                                options.saveArr.remove(attr);
                            }
                        }
                    });
                    if (options.saveCookies) { $.cookies.set(options.saveCookies, options.saveArr.join(',')); }
                }

                // 全选
                $checkall.on('change', function () {
                    if ($(this).prop('checked')) {
                        $checkbox.prop('checked', true);
                    } else {
                        $checkbox.prop('checked', false);
                    }
                    check();
                });

                // 单选
                $checkbox.on('change', function () {
                    check();
                });

                // 默认选中
                if (options.saveArr.length > 0) {
                    $checkbox.each(function () {
                        var $this = $(this);
                        var attr = $this.data(options.saveAttr) ? $this.data(options.saveAttr) : '';
                        if (options.saveArr.indexOf(attr) > -1) {
                            $this.prop('checked', true);
                        }
                    });
                    if ($checkbox.length == $checkbox.filter(':checked').length) {
                        $checkall.prop('checked', true);
                    }
                }
            });

        },

        // select组件
        select: function (options) {

            // 默认参数定义   
            var options = $.extend({

            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                var select = $(this);
                var button = select.find('div');
                var span = button.find('span');
                var ul = select.find('ul');
                var id = select.attr('id');
                var key = span.attr('data-key');
                var input = $('<input type="hidden" name="' + id + '" value="' + key + '">');

                var hidden = select.find('input[type=hidden]');
                if (!hidden.length) {
                    select.append(input);
                } else {
                    hidden.val(key).attr('name', id);
                }

                select.on('click', 'div', function () {
                    if (!select.hasClass('show')) {
                        $('.select').removeClass('show');
                        select.addClass('show');
                    } else {
                        select.removeClass('show');
                    }
                });

                select.on('click', 'li', function () {
                    span.html($(this).html());
                    span.attr('data-key', $(this).attr('data-key'));
                    input.val($(this).attr('data-key'));
                    hidden.val($(this).attr('data-key'));
                    select.removeClass('show');
                });

                $(document).on('click', function (e) {
                    var target = $(e.target);
                    if (!target.is('.select div,.select div span,.select div em,.select div i')) {
                        select.removeClass('show');
                    }
                });

            });

        },

        // dialog组件
        dialog: function (options) {

            // 默认参数定义   
            var options = $.extend({
                content: ' '
            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                btn.on('click', function () {

                });

            });

        },

        // 日历组件
        calendar: function (options) {

            // 默认参数定义   
            var options = $.extend({
                setTime: '',
                minDate: '',
                zIndex: 0
            }, options);

            // 返回所有对象，实现连缀     
            return this.each(function () {

                var input = $(this);
                var date = new Date();
                var sTime = '';

                if (options.setTime == 'none') {
                    sTime = '';
                } else if (options.setTime != 'none' && options.setTime != '') {
                    sTime = options.setTime;
                } else if (input.val()) {
                    sTime = input.val();
                } else {
                    sTime = new Date();
                }

                var calendar = new Calendar({
                    id: input.attr('id'),
                    isPopup: true,
                    isPrevBtn: true,
                    isNextBtn: true,
                    isCloseBtn: 0,
                    count: 1,
                    monthStep: 1,
                    isHoliday: false,
                    isHolidayTips: true,
                    isReadonly: true,
                    isDateInfo: true,
                    range: {
                        mindate: options.minDate == 'all' ? '' : date,
                        maxdate: "2020-12-31"
                    },
                    setTime: sTime
                });
                calendar.revise = {
                    top: -1,
                    left: 0,
                    zIndex: options.zIndex
                };
                calendar.on("dateClick", function (obj) {
                    this.selectDate = obj["data-date"];
                });
                $('.calendar').on('selectstart', function () {
                    return false;
                });
                $('.date-info').on('click', function () {
                    $(this).siblings('input').click();
                });
            });

        },

        // 用搜索下拉组件
        SearchDropdown: function (options) {

            var options = $.extend({
                type: 'username', // 或companyName
                defualtValue: '',
                submit: null
            }, options);

            return this.each(function () {

                var $searchDropdown = $(this);
                var $input = $searchDropdown.find('.search-input');
                var $submit = $searchDropdown.find('button');
                var li = '';
                var flag = -1;
                var top = 24;

                // 搜索数据
                function search(val) {
                    var val = $.trim(val);
                    var li = '';
                    if (disSearchList && disSearchList.length) {
                        if (val) {
                            $input.attr('data-id', '');
                            $.map(disSearchList, function (item, i) {
                                if (item.username.indexOf(val) > -1 || item.companyName.indexOf(val) > -1) {
                                    if (item.username == val || item.companyName == val) { // 完全一样才更改id
                                        $input.attr('data-id', item.id);
                                    }
                                    li += '<li data-id="' + item.id + '">' + item[options.type] + '</li>';
                                }
                            });
                        } else {
                            $input.val('').attr('data-id', '');
                            $.map(disSearchList, function (item, i) {
                                li += '<li data-id="' + item.id + '">' + item[options.type] + '</li>';
                            });
                        }
                    }
                    $dropdown.html(li);
                    $dropdown.scrollTop(0);
                    return li == '' ? false : true;
                }

                // 选中当前
                function active(index) {
                    var $li = $dropdown.find('li');
                    var $thisLi = $li.eq(index);
                    $li.removeClass('active');
                    $thisLi.addClass('active');
                    $input.val($thisLi.html()).attr('data-id', $thisLi.attr('data-id'));
                    $dropdown.scrollTop(index * top);
                }

                // 插入下拉列表
                var $dropdown = $('<ul class="dropdown"></ul>');
                $searchDropdown.append($dropdown);

                // 默认加载全部
                search();

                // 默认限制内容,只能是数字id
                var defaultValue = options.defaultValue;
                if (/^[1-9]\d*$/.test(defaultValue) && disSearchList && disSearchList.length) {
                    $.map(disSearchList, function (item, i) {
                        if (item.id == defaultValue) {
                            $input.val(item[options.type]).attr({
                                'data-id': item.id
                            });
                        }
                    });
                }

                // 聚焦
                $input.on('focus', function () {
                    flag = -1;
                    search($(this).val()) ? $dropdown.show() : $dropdown.hide();
                })

                // 失焦
                .on('blur', function () {
                    flag = -1;
                    setTimeout(function () {
                        $dropdown.hide();
                    }, 150);
                })

                // 键入
                .on('keyup', function (e) {
                    var keyCode = e.keyCode;
                    var $li = $dropdown.find('li');
                    if (keyCode == 40) {
                        if ($dropdown.is(':visible')) {
                            if (flag + 1 < $li.length) {
                                ++flag;
                            } else {
                                flag = 0;
                            }
                            active(flag);
                        }
                    } else if (keyCode == 38) {
                        if ($dropdown.is(':visible')) {
                            if (flag > 0) {
                                --flag;
                            } else {
                                flag = $li.length - 1;
                            }
                            active(flag);
                        }
                    } else if (keyCode == 13) {
                        flag = -1;
                        $dropdown.hide();
                    } else {
                        flag = -1;
                        search($(this).val()) ? $dropdown.show() : $dropdown.hide();
                    }
                    return false;
                })

                // 鼠标粘贴
                .on('paste', function () {
                    setTimeout(function () {
                        flag = -1;
                        search($input.val());
                        if ($dropdown.html() != '') {
                            $dropdown.show();
                        } else {
                            $dropdown.hide();
                        }
                    }, 50);
                });

                // 选中
                $searchDropdown.on('click', '.dropdown li', function () {
                    var $this = $(this);
                    $input.val($this.html()).attr('data-id', $this.attr('data-id'));
                });

                // 提交按钮
                if (typeof options.submit == 'function') {
                    $submit.on('click', function () {
                        options.submit({
                            did: $input.attr('data-id'),
                            btn: $submit
                        });
                    });
                }

            });

        },

        // 返回价格提示
        MoveTips: function (options) {

            var options = $.extend({
                x: 10,
                y: 20,
                tips: null,
                callback: null
            }, options);
            var $tips = $(options.tips);
            var $content = $tips.find('p');

            return this.each(function () {

                var $this = $(this);
                $this.on('mouseover', function (e) {
                    if (typeof options.callback == 'function') {
                        options.callback($content, $this);
                    }
                    $tips.show().css({
                        left: (e.pageX + options.x) + 'px',
                        top: (e.pageY + options.y) + 'px'
                    });
                }).on('mouseout', function () {
                    $tips.hide();
                    $content.empty();
                }).on('mousemove', function (e) {
                    $tips.css({
                        left: (e.pageX + options.x) + 'px',
                        top: (e.pageY + options.y) + 'px'
                    });
                });

            });

        }

    });

})(jQuery);

// 组件调用
(function () {

    $('.dynamic-input').Input();
    $('.icon-radio, .icon-checkbox').checkInput();
    $('.select').select();

    // 分销商搜索下拉组件
    $('#J-search-dist').SearchDropdown({
        defaultValue: typeof selectDisId == 'undefined' ? '' : selectDisId,
        submit: function (data) {
            $.ajax({
                url: '/ycfad2014/commercial/selectDis',
                type: 'get',
                data: {
                    disId: data.did
                },
                dataType: 'json',
                beforeSend: function () {
                    data.btn.addClass('disabled').attr('disabled', true);
                },
                success: function (result) {
                    if (result.success) {
                        location.reload();
                    }
                }
            });
        }
    });

})();

// 显示微信二维码
(function () {

    var $code = $('#J-weixin-code').find('.weixin-code');
    var timer = null;

    $('#J-weixin-code, #J-weixin-code .weixin-code').on('mouseover', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            $code.show();
        }, 100);
    }).on('mouseout', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            $code.hide();
        }, 100);
    });

})();

// 删除按钮
(function () {
    $(document).on('click', '.btn-takeoff i', function () {
        $(this).parent('.btn-takeoff').remove();
    });
})();

// 公用搜索框
(function () {

    var $search = $('#J-search');
    var $distList = $search.find('#J-dist-list');
    var $key = $search.find('input');
    var $submit = $search.find('button[type=button]');
    var $time = $search.find('.search-calendar');
    var $searchDist = $('#J-search-dist');

    // 除了搜索页都跳转到搜索页
    if (location.pathname.indexOf('purchase/packagelist') == -1) {

        // 开启日历
        $time.calendar({
            setTime: $.addDay(1)
        });

        // 点击跳转
        $submit.on('click', function () {
            var $distId = '';
            var val = $.trim($key.val());
            val = (val == $key[0].defaultValue ? '' : val);
            var id = $searchDist.find('.search-input').attr('data-id');
            /*if ($searchDist.length && id) {
                $distId = '&distId=' + id;
            }*/
            location.href = '/ycfad2014/purchase/packagelist#keyWord=' + encodeURIComponent(val) + '&startTime=' + $time.val() + $distId;
            return false;
        });

    }

    // 非管理员可以回车搜索
    if (typeof disSearchList == 'undefined' || !disSearchList.length) {
        $search.on('keyup', function (e) {
            if (e.keyCode == 13) {
                $submit.triggerHandler('click');
            }
        });
    }

})();

// 切换子菜单
(function () {

    var $menuItem = $('#J-menu-item').find('li');
    var $div = null;
    var $icon = null;

    $menuItem.hover(function () {

        $div = $(this).find('div');
        $icon = $(this).find('.icon-css');
        $div.show();
        $icon.addClass('blue');

    }, function () {
        if ($div) {
            $div.hide();
        }
        if ($icon) {
            $icon.removeClass('blue');
        }
    });

})();

// 表格行跳转链接
(function () {

    var table = $('.table');
    if (table.length) {
        var tbody = table.find('tbody');
        tbody.on('click', 'tr', function (e) {
            var target = $(e.target);
            if (!target.is('input')) {
                var link = $(this).attr('data-link');
                if (link) {
                    window.location=link;
                }
            }
        });
    }

})();

// 回到顶部
(function () {

    var $goTop = $('#J-go-top');
    $goTop.on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

})();

(function () {


    /**
	 * 分页
	 * chugang <chuganghong@qq.com>
	 */

    // 页码输出框显示当前页码，没有当前页码时，显示1
    var currentUrl = window.location.href;
    var regexp = /(page=)(\d+)/i;
    var pageArray = currentUrl.match(regexp);
    if (pageArray == null) {
        $("#goToPageValue").val(1);
    } else {
        var currentPage = pageArray[2];
        $("#goToPageValue").val(currentPage);
    }

    // 分页中的“确定”跳转到指定页
    $("#gotoPage").click(function () {
        var currentUrl = window.location.href;
        var regexp = /(page=)(\d+)/i;
        var pageArray = currentUrl.match(regexp);
        var goToPageValue = $("#goToPageValue").val();
        var newUrl = '';
        if (pageArray == null) {
            if (currentUrl.indexOf('?') == -1) {
                newUrl = currentUrl + '?page=' + goToPageValue;
            } else {
                newUrl = currentUrl + '&page=' + goToPageValue;
            }
        } else {
            newUrl = currentUrl.replace(regexp, "$1" + goToPageValue);
        }
        window.location.href = newUrl;
        return false;
    });

    // 防止在页码输出框中输入非数字字符
    $("#goToPageValue").keyup(function () {
        var pageValue = $("#goToPageValue").val();
        if (isNaN(pageValue)) {
            var notNumRegexp = /\D+/;
            var newPageValue = pageValue.replace(notNumRegexp, '');
            $("#goToPageValue").val(newPageValue);
        } else {
            //do nothing
        }
        return false;
    });

})();

//分页跳转
function go(obj) {
    var url = $(obj).attr('href');
    return false;
}

//获取字符串中的连贯数字
function getNum(str) {
    var regexp = /\d+/;
    // alert(str);
    var num = str.match(regexp);
    // alert(num);
    return num;
}