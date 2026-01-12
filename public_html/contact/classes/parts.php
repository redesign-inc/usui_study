<?php
class Parts {
	static function pref(string $current=null){
		$prefs = array('北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県');
		$output = "";
		foreach( $prefs as $pref ) {
			$selected = ( $current == $pref )? ' selected' : '';
			$output .= "\t<option value=\"".$pref."\"".$selected.">".$pref."</option>\n";
		}
		return $output;
	}

	static function year(int $current=null, int $start=null, int $count=3){
		$start = ( $start )? $start : date('Y');
		$output = "";
		for( $i=0;$i<$count;$i++ ) {
			$year = $start + $i;
			$selected = ( $current == $year )? ' selected' : '';
			$output .= "\t<option value=\"".$year."年\"".$selected.">".$year."</option>\n";
		}
		return $output;
	}

	static function month(int $current=null){
		$output = "";
		for( $i=1;$i<=12;$i++ ) {
			$selected = ( $current == $i )? ' selected' : '';
			$output .= "\t<option value=\"".$i."月\"".$selected.">".$i."</option>\n";
		}
		return $output;
	}

	static function day(int $current=null){
		$output = "";
		for( $i=1;$i<=31;$i++ ) {
			$selected = ( $current == $i )? ' selected' : '';
			$output .= "\t<option value=\"".$i."日\"".$selected.">".$i."</option>\n";
		}
		return $output;
	}
}
