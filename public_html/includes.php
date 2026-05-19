<?php
const SITE_PATH = '';
$query_var = array(
    'pageinfo' => array(
        'lang' => '',
        'title' => '',
        'description' => '',
        'url' => '',
        'bodyClass' => '',
    )
);

function set_query_var($key, $data) {
    global $query_var;
    foreach($data as $data_key => $data_val) {
        if($data_val) {
            $query_var[$key][$data_key] = $data_val;
        }
    }
}

function get_query_var($key = null) {
    global $query_var;
    if($key != null) {
        return $query_var[$key];
    }
}

function home_url() {
    echo '';
}

function get_header() {
    require(__DIR__.'/head.php');
}

function get_footer() {
    require(__DIR__.'/foot.php');
}