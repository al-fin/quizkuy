import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:quizkuy/app/theme/colors.dart';

class Input extends StatelessWidget {
  final String label;
  final String placeholder;
  final TextEditingController controller;
  final IconData icon;
  final bool obscureText;
  final TextInputType keyboardType;
  final Function onChanged;
  final int maxLines;
  final String variant; // elevated | outlined

  const Input({
    Key key,
    @required this.label,
    this.placeholder,
    this.controller,
    this.onChanged,
    this.icon,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.maxLines,
    this.variant = 'elevated',
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.poppins(
            fontSize: 12,
            color: variant == 'elevated' ? Colors.white : Colors.grey[700],
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(
          height: 2.5,
        ),
        Material(
          color: Colors.transparent,
          shadowColor: Colors.black.withOpacity(0.5),
          elevation: variant == 'elevated' ? 12 : 0,
          child: TextFormField(
            maxLines: maxLines,
            onChanged: onChanged,
            controller: controller,
            obscureText: obscureText,
            keyboardType: keyboardType,
            decoration: new InputDecoration(
              hintText: placeholder ?? label,
              hintStyle: TextStyle(color: Colors.grey),
              contentPadding: variant == 'elevated'
                  ? EdgeInsets.fromLTRB(20, 5, 20, 5)
                  : EdgeInsets.fromLTRB(10, 5, 10, 5),
              border: variant == 'elevated'
                  ? new OutlineInputBorder(
                      borderSide: BorderSide(width: 0, style: BorderStyle.none),
                      borderRadius: BorderRadius.circular(12),
                    )
                  : null,
              enabledBorder: (variant == 'outlined')
                  ? new OutlineInputBorder(
                      borderSide: BorderSide(width: 2, color: Colors.grey[300]),
                      borderRadius: BorderRadius.circular(12),
                    )
                  : null,
              focusedBorder: (variant == 'outlined')
                  ? new OutlineInputBorder(
                      borderSide:
                          BorderSide(width: 2, color: ThemeColors.PRIMARY),
                      borderRadius: BorderRadius.circular(12),
                    )
                  : null,
              filled: true,
              fillColor: Colors.white,
              prefixIcon: icon == null
                  ? null
                  : Icon(
                      icon,
                      color: Colors.grey,
                    ),
            ),
          ),
        )
      ],
    );
  }
}
