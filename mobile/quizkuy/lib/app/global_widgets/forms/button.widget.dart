import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:quizkuy/app/theme/colors.dart';

class Button extends StatelessWidget {
  const Button({
    Key key,
    this.text = '',
    this.onPressed,
    this.startIcon,
    this.endIcon,
    this.isLoading = false,
    this.textColor = ThemeColors.PRIMARY,
    this.backgroundColor = ThemeColors.LIGHT_BLUE,
  }) : super(key: key);

  final String text;
  final bool isLoading;
  final Function onPressed;
  final Color textColor;
  final Color backgroundColor;
  final IconData startIcon;
  final IconData endIcon;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: SizedBox(
        width: double.infinity,
        child: RaisedButton(
          color: backgroundColor,
          textColor: textColor,
          padding: EdgeInsets.all(12),
          disabledColor: Colors.grey[300],
          disabledTextColor: Colors.grey[400],
          disabledElevation: 0,
          onPressed: onPressed,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (startIcon != null) Icon(startIcon),
              if (text.length > 0 && startIcon != null) SizedBox(width: 10),
              Text(
                isLoading ? 'Loading...' : text,
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w700,
                  fontSize: 16,
                ),
              ),
              if (text.length > 0 && endIcon != null) SizedBox(width: 10),
              if (endIcon != null) Icon(endIcon)
            ],
          ),
        ),
      ),
    );
  }
}
