namespace FitBit.API.ServerApp.Attributes;

using System;

[AttributeUsage(AttributeTargets.Method)]
public class NeedsUserIdAttribute : Attribute
{
}
