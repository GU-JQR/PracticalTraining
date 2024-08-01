import $ from 'jquery'
import * as paper from "paper";
//import view from "paper";
//常量的定义
const config = {
    baseurl:'http://10.6.12.137:8088/#/user/login'
}
//函数的定义
function formatXml(text) {
    return text
}
//导出 {常量名、函数名}
export {config,formatXml}

/* ====================== *
 *  Toggle Between        *
 *  Sign Up / Login       *
 * ====================== */
$(document).ready(function(){
    $('#goRight').on('click', function(){
        $('#slideBox').animate({
            'marginLeft' : '0'
        });
        $('.topLayer').animate({
            'marginLeft' : '100%'
        });
    });
    $('#goLeft').on('click', function(){
        if (window.innerWidth > 769){
            $('#slideBox').animate({
                'marginLeft' : '50%'
            });
        }
        else {
            $('#slideBox').animate({
                'marginLeft' : '20%'
            });
        }
        $('.topLayer').animate({
            'marginLeft': '0'
        });
    });
});
