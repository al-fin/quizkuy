import 'package:intl/intl.dart';

String formatDate(String timestamp) {
  final date = DateTime.parse(timestamp);
  return DateFormat("EEEE, d MMMM yyyy", "id_ID").format(date);
}
