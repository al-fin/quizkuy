import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:custom_radio_grouped_button/custom_radio_grouped_button.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

// ignore: must_be_immutable
class SoalOptions<T> extends StatelessWidget {
  SoalOptions({
    Key key,
    this.value,
    this.handleChange,
    this.buttonLables,
    this.buttonValues,
    this.autoWidth = false,
    this.unSelectedColor = Colors.white,
    this.unSelectedBorderColor,
    this.padding = 3,
    this.spacing = 0.0,
    this.selectedColor = ThemeColors.ACCENT,
    this.selectedBorderColor,
    this.height = 35,
    this.width = 100,
    this.enableButtonWrap = false,
    this.horizontal = true,
    this.enableShape = true,
    this.elevation = 0,
    this.defaultSelected,
    this.customShape,
    this.absoluteZeroSpacing = false,
    this.wrapAlignment = WrapAlignment.start,
  }) : super(key: key);

  final String value;
  final void Function(T) handleChange;

  final bool horizontal;

  final List<T> buttonValues;

  final bool absoluteZeroSpacing;

  final double height;
  double padding;
  double spacing;

  final ButtonTextStyle buttonTextStyle = ButtonTextStyle(
    selectedColor: Colors.white,
    unSelectedColor: Colors.grey[700],
    textStyle: ThemeTextStyle(
      fontSize: 14,
    ),
  );

  final T defaultSelected;
  final bool autoWidth;
  final double width;
  final List<String> buttonLables;
  final Color unSelectedColor;
  final Color selectedColor;
  final Color unSelectedBorderColor;
  final Color selectedBorderColor;
  final ShapeBorder customShape;
  final WrapAlignment wrapAlignment;
  final bool enableButtonWrap;
  final bool enableShape;
  final double elevation;

  Color borderColor(index) =>
      (value == buttonValues[index]
          ? selectedBorderColor
          : unSelectedBorderColor) ??
      ThemeColors.PRIMARY;

  List<Widget> _buildButtonsColumn() {
    return buttonValues.map((e) {
      int index = buttonValues.indexOf(e);
      return Padding(
        padding: EdgeInsets.only(bottom: 5),
        child: Card(
          margin: EdgeInsets.all(absoluteZeroSpacing ? 0 : 4),
          color: value == buttonValues[index] ? selectedColor : unSelectedColor,
          elevation: elevation,
          shape: enableShape
              ? customShape == null
                  ? RoundedRectangleBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                    )
                  : customShape
              : null,
          child: DottedBorder(
            padding: EdgeInsets.all(0),
            color: value == buttonValues[index]
                ? Colors.transparent
                : Colors.grey[400],
            strokeWidth: value == buttonValues[index] ? 0 : 1,
            dashPattern: [6, 3],
            borderType: BorderType.RRect,
            radius: Radius.circular(10),
            child: InkWell(
              borderRadius: BorderRadius.circular(10),
              onTap: () {
                handleChange(e);
              },
              child: Container(
                width: double.infinity,
                padding: EdgeInsets.all(10),
                child: SizedBox(
                  width: double.infinity,
                  child: Text(
                    buttonLables[index],
                    textAlign: TextAlign.start,
                    style: buttonTextStyle.textStyle.copyWith(
                      color: value == buttonValues[index]
                          ? buttonTextStyle.selectedColor
                          : buttonTextStyle.unSelectedColor,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (absoluteZeroSpacing) {
      spacing = 0;
      padding = 0;
    }
    return _buildRadioButtons();
  }

  _buildRadioButtons() {
    if (horizontal)
      return Column(
        children: _buildButtonsColumn(),
      );
  }
}
