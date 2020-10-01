# autoIncrement

### name

* Type: `String`
* Default: `'<tableName>_<columnName>_seq'`
* Required: `false`

Sequence name

### start

* Type: `String | Number`
* Default: `1`
* Required: `false`

Start value

### min

* Type: `String | Number`
* Default: `1`
* Required: `false`

Minimum value

### max

* Type: `String | Number`
* Default: `9223372036854775807`
* Required: `false`

Maximum value

### cycle

* Type: `Boolean`
* Default: `false`
* Required: `false`

Sequence looping when max value is reached

### increment

* Type: `String | Number`
* Default: `1`
* Required: `false`

Determines which number will be added to the current value of the sequence

### actual

* Type: `Boolean`
* Default: `true`
* Required: `false`

Restart the sequence to the largest column value that uses this sequence

### force

* Type: `Boolean`
* Default: `false`
* Required: `false`

Force sync of sequence (drop and create). Priority over the `schema.force`