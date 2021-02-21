import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:google_fonts/google_fonts.dart';

class Autocomplete<T> extends StatelessWidget {
  const Autocomplete({
    Key key,
    @required this.label,
    @required this.controller,
    @required this.options,
    @required this.onSuggestionSelected,
    this.disabled = false,
    this.icon,
  }) : super(key: key);

  final String label;
  final IconData icon;
  final TextEditingController controller;
  final List<dynamic> options;
  final Function(dynamic) onSuggestionSelected;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.poppins(
            fontSize: 12,
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(
          height: 2.5,
        ),
        Material(
          color: Colors.transparent,
          shadowColor: Colors.black.withOpacity(0.5),
          elevation: 12,
          child: TypeAheadFormField(
            enabled: !disabled,
            suggestionsCallback: (pattern) {
              return List<T>.from(options.where((item) =>
                  item.nama.toLowerCase().contains(pattern.toLowerCase())));
            },
            itemBuilder: (context, suggestion) {
              return ListTile(
                title: Text(suggestion.nama),
                dense: true,
              );
            },
            noItemsFoundBuilder: (context) {
              return ListTile(
                title: Text('Tidak ada data!'),
                dense: true,
              );
            },
            onSuggestionSelected: (suggestion) {
              controller.text = suggestion.nama;
              print('SUGGESTION :');
              print(suggestion.toString());
              onSuggestionSelected(suggestion);
            },
            textFieldConfiguration: TextFieldConfiguration(
              controller: controller,
              enabled: !disabled,
              style: TextStyle(color: disabled ? Colors.grey : Colors.black),
              decoration: InputDecoration(
                hintText: label,
                hintStyle: TextStyle(color: Colors.grey),
                contentPadding: EdgeInsets.fromLTRB(20, 5, 20, 5),
                border: new OutlineInputBorder(
                  borderSide: BorderSide(width: 0, style: BorderStyle.none),
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: Colors.white,
                prefixIcon: icon == null ? null : Icon(icon),
                suffixIcon: Icon(Icons.arrow_drop_down, color: Colors.grey),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
