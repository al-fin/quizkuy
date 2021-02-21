import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class InputPassword extends StatefulWidget {
  final String label;
  final TextEditingController controller;
  final IconData icon;

  const InputPassword({
    Key key,
    @required this.label,
    @required this.controller,
    this.icon,
  }) : super(key: key);

  @override
  _InputPasswordState createState() => _InputPasswordState();
}

class _InputPasswordState extends State<InputPassword> {
  bool obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
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
          child: TextFormField(
            controller: widget.controller,
            obscureText: obscureText,
            decoration: new InputDecoration(
              hintText: widget.label,
              hintStyle: TextStyle(color: Colors.grey),
              contentPadding: EdgeInsets.fromLTRB(20, 5, 20, 5),
              border: new OutlineInputBorder(
                borderSide: BorderSide(width: 0, style: BorderStyle.none),
                borderRadius: BorderRadius.circular(12),
              ),
              filled: true,
              fillColor: Colors.white,
              prefixIcon: widget.icon == null
                  ? null
                  : Icon(
                      widget.icon,
                      color: Colors.grey,
                    ),
              suffixIcon: ClipOval(
                child: Material(
                  color: Colors.transparent,
                  borderRadius: BorderRadius.circular(100),
                  child: IconButton(
                    icon: Icon(
                      obscureText ? Icons.visibility_off : Icons.visibility,
                      color: Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        obscureText = !obscureText;
                      });
                    },
                  ),
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}
